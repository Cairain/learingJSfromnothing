
var array =[4.2,56,15,8,361,1548,1,6]
var aaa = ['wode', 'shishi', 'keyi ',{'jj' : 'ad'}];

function _isArray(option) {
	if(Object.prototype.toString.call(option) === '[object Array]') {
		return true;
	} else {
		return false;
	}
};
function _isObject(option) {
	if(typeof option === 'object' && option !== null && Object.prototype.toString.call(option) !== '[object Array]') {
		return true;
	} else {
		return false;
	}
}

Array.prototype._push = function() {
	var len = arguments.length
	for (var i = 0; i < len; i++) {
		this[this.length] = arguments[i];
	}
	return this;
}

Array.prototype._concat = function() {
	var len = arguments.length
	var arr = [];
	if (len === 0){
		for (let i = 0; i < this.length; i++) {
			arr._push(this[i])
		}
		return arr;
	} else {
			for (let i = 0; i< len; i++) {
				if (arguments[i] === undefined)
					return undefined;
				else if (
					typeof arguments[i] === 'string'
						||  arguments[i]=== null
						||  typeof arguments[i] === 'number'
						|| 	typeof arguments[i] === 'Boolean'
						|| typeof arguments[i] ==='function'
				) {
					this._push(arguments[i])
				} else if (
					_isArray(arguments[i])
						||_isObject(arguments[i])
				
				) {
					console.log(_isArray(arguments[i]));
					console.log(_isObject(arguments[i]));
					for (let j = 0;j <arguments[i].length;j++ ) {
						this._push(arguments[i][j])
					}
				}
				
			}
			
			return this
	}

}

console.log(array._concat(aaa));
