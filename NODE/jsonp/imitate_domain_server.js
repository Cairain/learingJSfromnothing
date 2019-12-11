const  express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const qs = require('querystring');

var datas = {
	"weather": "全国大部降水稀少持续干燥 江南温暖同期少见"
}

app.use('/static', express.static(path.join(__dirname, '/node_modules')))

app.get('/', function(req, res) {
	// fs.readFile(path.join(__dirname, '/views/index.html'), function (err, data) {
	// 	if (err) {
	// 		res.send('404 NOT found')
	// 		return;
	// 	}
	// 	res.writeHeader(200, {
	// 		'Content-type': 'text/html; charset="utf8"'
	// 	})
	// 	res.end(data);
	
	// res.sendFile(path.join(__dirname, '/views/index.html'))
	var callback = qs.parse(req.url.substr(2)).callback
	res.send(`arg="${datas["weather"]}"`);
})
	

app.post('/', function(req, res) {
	res.send(`document.write(${datas})`);
})


app.listen(3000, function() {
	console.log('jSONP server is running')
})