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
		var min = 1;
		var max = 100000;
		var random = Math.floor(Math.random()* (max - min)+ min);
		var imageUser = '<img class="avatar" src="https://api.adorable.io/avatars/40/'+random+'"/>'+ " ";
		
		io.emit('message', {message: message, user: imageUser+userLog});
	});	
	console.log("User is connected");
	
	socket.on('disconnect', function(){
		console.log("User is disconnected !");
	});
});