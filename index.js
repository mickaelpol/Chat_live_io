const express = require('express');
const app = express();
var bodyparser = require('body-parser');
var socket = require('socket.io');
var server = app.listen(1337);
var io = socket(server);

app.use(express.static('public'));

io.on('connection', function(socket){
	console.log("connecté");
	socket.on('disconnect', function(){
		console.log("déconnecté");
	})
})

app.listen(2000);
