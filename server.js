var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var socket = require('socket.io');
var server = app.listen(2000);
var io = socket(server);
var ent = require('ent');




app.use(express.static('public'));

//Action sur la connection 
io.on('connection', function(socket){
	var userLog;  
	socket.on('login', function(user){
		userLog = ent.encode(user);
		socket.broadcast.emit('service-message', userLog);
	});

	socket.on('chat message', function(msg){
		var message = ent.encode(msg);
		io.emit('message', {message: message, user: userLog});
	});	

	socket.on('disconnect', function(){
		console.log("User is disconnected ! ");
	});
});