
(function() {
	
	
	const Promiss = function (executor) {  //执行器是同步执行
		const self = this;
		self.status = 'pending';
		self.data = undefined; //内部code的执行结果,resolved or rejected
		self.callbacks = []; //内部code的回调函数对象queue. 每个callbackobj 含有(onFufilled() {}, onRejcted() {})
		//defiend functions
		/*
		 *状态只会改变一次，由 pending =》fufilled 或者 pending =》 rejected
		 */
		function resolve(value) {
			//judge the status
			if (self.status !== 'pending') {
				return
			}
			self.data = value;
			self.status = 'fufilled';
			//改变状态为fufilled 并且 执行callbackobj的onFufilled函数
			if (self.callbacks.length > 0) {
				//模拟异步执行
				setTimeout(() => {
					self.callbacks.forEach( callbackObj => {
						callbackObj.onFufilled(value)   //传给then()来处理
					})
				})
			}
		}
		
		function reject(reason) {
			self.data = reason;
			self.status = 'rejected';
			//改变状态为rejected并且 执行callbackobj的onRejected函数
			if (self.callbacks.length > 0) {
				//模拟异步执行
				setTimeout(() => {
					self.callbacks.forEach( callbackObj => {
						callbackObj.onRejcted(reason)      //传给then()来处理
					})
				})
			}
		}
		//excutor function 同步执行 abruptly computation
		//catch error
		try {
			executor(resolve, reject)
		} catch(err) {
			reject(err)
		}       
	}
	// 
	Promiss.prototype.then = function (onFufilled, onRejcted) {
		onFufilled= typeof onFufilled=== 'Function' ? onFufilled :value =>  value
		onRejcted = typeof onRejcted === 'Function' ? onRejcted :reason =>  {throw reason}
		
		const self = this;
		//返回一个新的Promiss对象才能链式调用
		return new Promiss((resolve, reject) => {
			//假设当前状态是pending
			//将回调函数保存起来
			//改变状态!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if (self.status === 'pending') {
				self.callbacks.push({
					onFufilled(value) {
						try {
							const result = 	onFufilled(self.data);
							if (result instanceof Promiss) {
									result.then(value => {
										resolve(value)
										},
									reason => {
										reject(reason)
									}	
								)
							} else { //not Promiss object
								resolve(result)
							}
						} catch (error) {
							reject(error) //change this.status
						}
					},
					onRejcted(reason) {
						try {
							const result = 	onRejcted(self.data);
							if (result instanceof Promiss) {
									result.then(value => {
										resolve(value)
										},
									reason => {
										reject(reason)
									}	
								)
							} else { //not Promiss object
								resolve(result)
							}
						} catch (error) {
							reject(error) //change this.status
						}
					}
				})	
			} else if (self.status === 'fufilled') {
				/* 
				 * 1. 如果抛出错误,则返回错误的error message
				 * 2. 如果返回的是非Promiss对象,则返回这个对象的返回值
				 * 3. 如果返回Promiss对象,则返回Promiss对象的结果
				 */
				//直接调用 onFufilled()
				//this.data = value from executor.resolve()
				setTimeout(() => {
					try {
						const result = 	onFufilled(self.data);
						if (result instanceof Promiss) {
								result.then(value => {
									resolve(value)
									},
								reason => {
									reject(reason)
								}	
							)
						} else { //not Promiss object
							resolve(result)
						}
					} catch (error) {
						reject(error) //change this.status
					}
				})
			} else {
				setTimeout(() => {
					try {
						const result = 	onRejcted(self.data);
						if (result instanceof Promiss) {
								result.then(value => {
									resolve(value)
									},
								reason => {
									reject(reason)
								}	
							)
						} else { //not Promiss object
							resolve(result)
						}
					} catch (error) {
						reject(error) //change this.status
					}
				})
			}
		})
	}
	
	Promiss.prototype.catch = function () {
		return this.then(undefined, onRejected)
	}
	
	window.Promiss = Promiss;
}())