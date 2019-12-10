const express = require('express');
const app = express();
const router = require('./router');
const path = require('path')
const session = require('express-session');


app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));

app.engine('html', require('express-art-template'));//引入art-template
app.set('views', path.join(__dirname, './views'))
app.set('View engine', 'html');
//分发session
app.use(session({
	// cookie: {
	//         domain: 'localhost:8088', //设置域，注意不能加端口名，踩过此坑。
	//         path: '/',//设置cookie所在的url
	//         maxAge: 1000000,//设置过期时间，单位是毫秒
	//     },
  secret: 'wozhende tainan le ruguo neng ok jiu haole',
  resave: false,
  saveUninitialized: true
}))



app.use(router);
app.listen(8088, function() {
	console.log('web server is running.')
})