var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');


// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/opt/bitnami/apache2/conf/server.key'),
  cert: fs.readFileSync('nodecert.crt')
};

// Create a service (the app object is just a callback).
var app = express();


// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(3000);
var io = require('socket.io')(https);

app.get('/', function(req,res){

        res.send("hi");
});

io.on('connection',function (socket){
		socket.emit('message', {hi:'there'});
		socket.on('message',function (data){console.log(data); });
});

