const fs = require('fs');
const qs = require('querystring');
const request = require('request');

var url = 'http://localhost:3000/userLists';
var options = {
	url
};

//处理查询验证
var get_data = function (data, userinfo, callback) {
	var message = {};
	data = qs.parse(data);
	request(`${url}/?email=${data.email}`, function(error, response, body) {
			message.eMsg = body;
			request(`${url}/?${userinfo}=${data.userinfo}`, function(err, res, bod) {
				message.nMsg = bod ;
				callback && callback(message);
			})
	})
	// return message;
}

//处理登录验证
var login_check = function (data, callback) {
	var message = {};
	data = qs.parse(data);
	request(`${url}/?email=${data.email}&passWord=${data.passWord}`, function(error, response, body) {
		message.eMsg = body;
		callback && callback(message);	
	})
	// return message;
}

//处理新用户持久化数据
var add_data = function ( data) {
	var backData = '';
	data = qs.parse(data);
	options.method = 'POST';
	options.json = true;
	options.body = data;
	options.headers = {
		'Content-Type' : 'application/json',
		'Content-Length' : data.length
	};
	request(options, function(error, res, body) {
			if( error ) {
				console.log('error');
			}
	})
}




module.exports = {
	add_data,
	get_data,
	login_check
}