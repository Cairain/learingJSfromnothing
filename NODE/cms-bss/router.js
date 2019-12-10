const express = require('express');
const router = express.Router();
const qs = require('querystring');
const jsonSR = require('./jsserver');
const cryptoJS = require('crypto-js');


router.get('/', function(req, res, next) {
	console.log(req.session.uid+'-')
	if(req.session.uid) {
		var data = {
			hid : 'log-hid'
		}
	}
	res.render('index.html', data)
	next();
})

router.get('/register', function(req, res) {
	res.render('register.html')
})

router.post('/register', function(req, res) {
	postBody(req, function(upData) {
		jsonSR.get_data(upData, 'userName',  function(message) {
			var emmsg = '邮箱已注册,请重新输入.' , namsg = '用户名已被注册,请重新输入.'
			if (message.eMsg === '[]' && message.nMsg === '[]') {
				jsonSR.add_data(upData);
				//分发session
				req.session.uid = cryptoJS.MD5(upData).toString();
				console.log(req.session.uid)
				res.send('')
			} else {
				if (message.eMsg !== '[]') {
					res.send(emmsg);
				} else {
					res.send(namsg);
				}
			}
		});
	})
	//post之前验证email或者用户名是否重复
	//验证成功后上传数据	
	//上传成功后跳转页面
	// res.redirect('/');
})

router.get('/login', function(req, res) {
	res.render('login.html')
})
router.post('/login', function(req, res) {
	postBody(req, function(upData) {
	//处理登录验证
		jsonSR.login_check(upData, function(message) {
			var errormsg = '邮箱或密码错误,请重新输入.' 
			if (message.eMsg === '[]') {
				return res.send(errormsg);
			} 
			res.send('');
		});	
	});
})
//验证内容页是否也有session.uid
router.get('/upcontent-1', function(req, res) {
	console.log(req.session.uid+'-----')
	if(req.session.uid) {
		var data = {
			hid : 'log-hid'
		}
	}
	res.render('upcontent.html', data)
})

//重复部分进行方法封zhuang
 function postBody(req, callback) {
	 var news = '';
	 var upData;
	 req.on('data', function(chunk) {
	 	news += chunk;
	 });
	 req.on('end', function() {
	 //发送给数据库之前对密码加密
	 	news = qs.parse(news);
	 	news.passWord = cryptoJS.MD5(news.passWord).toString();
	 	upData = qs.stringify(news);
		callback&&callback(upData);
		})
	
 }

 
module.exports = router;