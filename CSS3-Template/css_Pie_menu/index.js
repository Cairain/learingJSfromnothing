(function(window){                   //保护命名空间
	window.onload = function(){      //必须在dom加载完后操作
		function Fanshape(id){
			this._init(id);
		};
		Fanshape.prototype = {
			constructor : Fanshape,  //回指
			_init : function(id){    //初始化属性
				this.id = id;
				this.initer();       //执行
			},
			initer:function(){       //初始化并定义全局变量，获取最大包含块。调用所有方法
				this.flag = true;
				this.wrap = document.querySelector(this.id);
				this.imgs = this.wrap.querySelectorAll('img');
				this.imenu = this.wrap.querySelector('#menu');
				this.imgs = Array.from(this.imgs);
				this.menuRotation();
			},
			menuRotation: function(){  //菜单栏旋转
				var that = this;
					this.imenu.onclick = function() {
				if(that.flag){
					that.imgs.forEach(function(el,i){
						el.style.transform = 'rotate(720deg) scale(1)'
					});
					this.style.transform = 'rotate(720deg)'
					that.secMenuRotaIn();
				}else{
					that.imgs.forEach(function(el,i){
						el.style.transform = 'rotate(0deg) scale(1)'
					});
					this.style.transform = 'rotate(0deg)';
					that.secMenuRotaOut();
					}
				that.flag = !that.flag;	
				}            
			},
			secMenuRotaIn : function(){                    //二级菜单 转出
				var that = this;
				this.imgs.forEach(function(el,i){
					el.style.transition = "all .5s   "+ i*.1 +"s    cubic-bezier(0.54,-0.21, 0.35, 1.4)";
					el.style.left = that.calcPos(i).left +"px";
					el.style.top = that.calcPos(i).top  +"px";
				});
				this.touchRota();
			},
			secMenuRotaOut : function(){                    //二级菜单 转出
				var that = this;
				this.imgs.forEach(function(el,i){
					el.style.transition = "all .5s   "+ i*.1 +"s    cubic-bezier(0.54,-0.21, 0.35, 1.4)";
					el.style.left = "0px";
					el.style.top = "0px";
				})
			},
			touchRota:function(){ 
				var that = this;//二级菜单点击效果  放大透明 -> 缩小不透明
				this.imgs.forEach(function(el,i){
					el.onclick = function(){
						el.style.transition = " .5s ";
						// this.style.transform="translate("+ that.calcPos(i).left +"px,"+that.calcPos(i).top  +"px)"+'scale(1.5)';
						this.style.opacity = .2;
						this.style.transform= ' rotate(720deg) scale(2)';
						this.addEventListener('transitionend',that.trend);
					}
				})
			},
			calcPos:function(ind){  //计算二级菜单转出的位置
				var x = -Math.round(250*Math.sin(ind*22.5*Math.PI/180));
				var y = -Math.round(250*Math.cos(ind*22.5*Math.PI/180));
				return {
					left:x,
					top:y
				}
			},
			trend:function(){
					var that = this;
					this.style.transition = " .5s ";
					// this.style.transform="translate("+ that.calcPos(i).left +"px,"+that.calcPos(i).top  +"px)"+'scale(1)';
					this.style.opacity = 1;
					this.style.transform= ' rotate(720deg) scale(1)';
					
				this.removeEventListener('transitionend',that.trend);
			}
		};
		var fan = new Fanshape('#wrap');
	};
}(window))


