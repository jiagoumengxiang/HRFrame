var express = require('express');
var app = express();

app.use(express.static('asserts'));
app.get('/', function (req, res) {
	res.send('Hello World!');
});
app.get("/hello",function(req,res){
	res.send("aaa");
});
app.get("/tasklist",function(req,res){
	res.send('{"tasklist":[{"name":"aaa","time":123},{"name":"bbb","time":234}]}');
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
