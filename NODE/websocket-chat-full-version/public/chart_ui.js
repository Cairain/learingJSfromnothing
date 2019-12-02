function textEval(message) {
	return $('<div></div>').text(message);
};

function htmlEval(message) {
	return  $('<div></div>').html(`<pre>${message}</pre>`);
};

function processUserInput(chartApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;
	if (message.charAt(0) === '/') {
		systemMessage = chartApp.processCommand(message);
		if (systemMessage) {
			$('#messages').append(htmlEval(systemMessage));
		} 
	} else {
		chartApp.sendMessage($('#room').text(), message);
		$('#messages').append(textEval(message));
		$('#messages').scrollTop($('messages').prop('scrollHeight'))
	}
	$('#messages').val(' ');
};
var socket = io.connect(); //?????????????????????????????????????????????????????????????????????
$(document).ready(function() {
	var chartApp = new Chart(socket);
	socket.on('nameResult', function(result) {
		var message;
		if (result.sucess) {
			message = '你现在的昵称是' + result.name +'.';
		} else {
			message = result.message;
		}
		$('#messages').append(htmlEval(message));
	});
	
	socket.on('joinResult', result => {
		$('#room').text(result.room);
		$('#messages').append(htmlEval('room changed'));
	});
	
	socket.on('message', message => {
		var newEle = $('<div></div>').text(message.text);
		$('#messages').append(newEle);
	});
	
	socket.on('rooms', rooms => {
		$('#room-list').empty();
		for(var room in rooms) {
			room = room.substring(1, room.length);
			if (room !=='') {
				$('#room-list').append(textEval(room))
			}
		};
		$('#room-list div').click(() => {
			chartApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		})
	});
	
	setTimeout(function() {
		socket.emit('rooms')
	}, 1000);
	
	$('#send-message').focus();
	
	$('#send-form').submit(function() {
		processUserInput(chartApp, socket);
		return false;
	});
});