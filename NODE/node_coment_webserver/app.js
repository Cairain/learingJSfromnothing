const http = require('http');
const fs = require('fs');
const template = require('art-template');
const querystring = require('querystring');  //专门处理get url 的k v

let list = [{
			name : "刘慈欣",
			comment : '主不在乎,但我在乎!',
			ctime : new Date().toLocaleString('chinese',{hour12:false})
		},
		{
			name : "Joker",
			comment : '所有人deserve to die',
			ctime :new Date().toLocaleString('chinese',{hour12:false})
		},
		{
			name : "虞姬",
			comment : '项王意气尽 四面楚歌声',
			ctime :new Date().toLocaleString('chinese',{hour12:false})
		},
		{
			name : "徐志摩",
			comment : '最是那一低头的温柔/ 像一朵水莲花/ 不胜凉风的娇羞',
			ctime : new Date().toLocaleString('chinese',{hour12:false})
		}];
		

http.createServer((request, response) => {
	let myurl = new URL(`http://127.0.0.1:8080${request.url}`);  //必须拼接 request.url不带前面地址
	let pathname = myurl.pathname;
	let obj = querystring.parse(myurl.search.slice(1));      
	if (pathname ==='/') {
	fs.readFile('./views/index.html', (err, data) => {
		if (err) {
			return '404';
		}
		let html =  template.render(data.toString(), {   //字符串 对象
			list
		});
		response.end(html);
	})
	} else if (pathname ==='/post') {
		fs.readFile('./views/post.html', (err, data) => {
			if (err) {
				return '404';
			}
			let html =  template.render(data.toString(), {
				list
			});
			response.end(html);
		})
	}
	else if (pathname === '/justdoit') {
		obj.ctime = new Date().toLocaleString('chinese',{hour12:false});
		list.unshift(obj) ;
		response.statusCode = 302;                   //处理数据并重定向首页
		response.setHeader('Location', '/')
		response.end();
	}
	else if (pathname.indexOf(/public/) === 0 ) {
		fs.readFile('.' + pathname, (err, data) => {
			if (err) {
				return '404';
			}
			response.setHeader('Content-Type','text/css;charset=utf-8')
			response.end(data);
		})
		
	}
	 else {
		response.end('404 Not found')
	}
		
}).listen(8080, () => {
	console.log('just do it');
})