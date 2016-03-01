var express = require('express');
var http=require('http');
var querystring=require('querystring');
var app = express();

app.use(express.static('asserts'));
app.get("/tasks",function(_req,_res){
	_res.send('{"tasklist":[{"name":"aaa","time":111},{"name":"bbb","time":222}]}');
});
app.get('/aa', function (req, res) {
	var options={};
	options.path="/view/xjgl/AjaxHandler.ashx?lx=GetXjlxList";
	options.host="172.16.251.232";
	options.port="8001";
	http.request(options,function(data){
		console.log(data);
		req.send(data);
	});	
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
