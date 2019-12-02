/*
	客户端js,用于与服务端交互
*/

var Chart = function(socket) {
	this.socket = socket;
};
Chart.prototype.sendMessage = function(room, text) {
	var message = {
		room : room,
		text : text
	};
	this.socket.emit('message', message);
};
Chart.prototype.changeRoom = function(room) {           //变更房间
	this.socket.emit('join', {
		newRoom : room
	})
};
Chart.prototype.processCommand = function(command) {            //处理用户输入
	var words = command.split(' ');
	var command = words[0].substring(1, words[0].length).toLowerCase();
	var message = false ;
	switch(command) {                                         //处理用户命令
		case 'join':
			words.shift();
			var room = words.join(' '); 
			this.changeRoom(room);  //=========================debug
			break;
		case 'nick':
			words.shift();
			var name = words.join(' ');
			this.socket.emit('nameAttempt', name);
			break;
		default:
		mesage = '不可识别的命令,请确认后再行输入.';
		break;
	}
	return message;                                   //返回消息
};
