const express = require('express');
const app = express();
var bodyparser = require('body-parser');
var socket = require('socket.io');
var server = app.listen(2000);
var io = socket(server);
var ent = require('ent');
// var encode = require('ent/encode');
// var decode = require('ent/decode');

app.use(express.static('public')); // precise que je vais chercher des fichiers dans le dossier public

io.on('connection', function(socket){ // fonction de connection sinon deconnection
	console.log("connecté");
	socket.on('disconnect', function(){
		console.log("déconnecté");
	})

	socket.on('message-send', function(msg){
		msg[0]= ent.encode(msg[0]);
		msg[1]= ent.encode(msg[1]);

		io.emit('message-send', msg); // fonction des message envoyé
	});
});