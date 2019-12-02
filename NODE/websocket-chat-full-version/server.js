const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const chartServer = require('./lib/chart_server.js');
var  cache = {};


 //404函数
function sendError(response) {    
	response.writeHead(404, {
		'Content-Type' : 'text/plain'
	});
	response.end('Error 404, resouce not found');	
}

//读取文件
function sendFile(response, filePath, fileContents) {  
	response.writeHead(200, {
		'Content-Type' : mime.lookup(path.basename(filePath))
	});
	response.end(fileContents);
}

//从内存中读取文件,比服务端读取快
function serverStatic(response, cache, absPath) {   
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.readFile(absPath, (err, data) => {
			if (err) {
			sendError(response);
			} else {
				cache[absPath] = data;
				sendFile(response, absPath, data);
			}
		})
	}
}

//创建服务器并监听请求地址,输出相应文件
var server = http.createServer((request, response) => {
	var filepath = '';
	if (request.url ==='/') {
		filepath = 'public/index.html';
	} else {
		filepath ='public' + request.url ;   //资源均在public目录
	}
	var absPath = './' + filepath;
	serverStatic(response, cache, absPath); //调用内存打开文件
})
	.listen(8081, () => {
		console.log('server is running, yah')
	})

//io绑定到http服务器
chartServer.listen(server)