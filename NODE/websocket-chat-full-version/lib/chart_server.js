const socketio = require('socket.io');
var io;
let guesstNum = 1;
let nickNames = {};
let nameUsed = [];
let currentRoom = {};


exports.listen = server => {
	io = socketio.listen(server); //绑定到http服务器
	io.set('log level', 1);
	io.sockets.on('connection', socket => {
		guesstNum = bindGuesstName(socket, guesstNum, nickNames, nameUsed);//给初次进入房间用户绑定昵称
		joinRoom(socket, 'Lobby');                    //初次用户放入lobby房间
		handleMessageAndRoom(socket);     //处理用户名字变更以及房间名称的创建与变更  name aRg
		handleNameChangeAttempts(socket, nickNames, nameUsed);
		handleRoomJoin(socket);
		socket.on('rooms', () => {
			socket.emit('rooms', io.sockets.manager.rooms) ;
				   //用户发起请求时提供房间名
		});	
	 handleClientDisconnection(socket, nickNames, nameUsed);
	})
};

function bindGuesstName(socket, guesstNum, nickNames, nameUsed) {
	var name = 'guest' + guesstNum;
	nickNames[socket.id] = name;
	socket.emit('nameResult', {
		sucess : true,
		name : name
	});
	nameUsed.push(name);
	return guesstNum + 1;   //返回num
};

function joinRoom(socket, room) {
	socket.join(room);            //用户加入房间
	currentRoom[socket.id] =  room;   //将用户放入该房间
	socket.emit('joinResult', {room});   //让用户知道他们进入房间
	socket.broadcast.to(room).emit('message',{							//广播用户进入房间
		text :nickNames[socket.id] + 'has joined' +room + '.'
	});
	var usersInRoom = io.sockets.clients(room);   //确定有哪些用户
	if (usersInRoom > 1) {
		var usersInRoomCounts = '现有用户' + room +':';
		for (var index in usersInRoom) {}
		var userSocketid = usersInRoom[index].id;
		if (userSocketid !== socket.id) {
			if (index > 0) {
				usersInRoomCounts += ',';
			}
			usersInRoomCounts += nickNames[userSocketid];
		}
		usersInRoomCounts += '.';
		socket.emit('message', {
			text : usersInRoomCounts
		})
	}
}

function handleNameChangeAttempts(socket, nickNames, nameUsed) {
	socket.on('nameAttempt',  name => {
		if (name.indexOf('guest') === 0) {   //昵称不可以guest开头
			socket.emit('namrResult', {
				sucess : true,
				message : '昵称不可以guest开头'
			});
		} else {
			if (nameUsed.indexOf(name) == -1) {
				var preName = nickNames[socket.id];   
				var preNameIndex = nameUsed.indexOf(preName);  //没昵称就加上
				nameUsed.push(name);
				delete nameUsed[preNameIndex];      //删除原昵称
				socket.emit('nameResult', {
					sucess :true,
					name
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message', {
					text : preName + '更改昵称为'+ name +'.'
				});
			} else {                     //昵称被占用发送错误消息
				socket.emit('nameReault', {
					sucess : false,
					message : '该昵称已被占用'
				});
			}
		}
	});
}

function handleMessageAndRoom(socket) {  //发送消息
	socket.on('message', message => {
		socket.broadcast.to(message.room).emit('message', {
			text :nickNames[socket.id] + ':' + message.text
		})
	})
}

function handleRoomJoin(socket) {
	socket.on('join', room => {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom)
	})
}

function handleClientDisconnection(socket, nickNames, nameUsed) {
	socket.on('disconnect', () => {
		var nameIndex = nameUsed.indexOf(nickNames[socket.id]);
		delete nameUsed[nameIndex];
		delete nickNames[socket.id];
	})
}