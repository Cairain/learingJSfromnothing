var array =[4.2,56,15,8,361,1548,1,6]

Array.prototype._push = function() {
	var len = arguments.length
	for (var i = 0; i < len; i++) {
		this[this.length] = arguments[i];
	}
	return this;
}

var newa = array._push('da')

console.log(newa.length);