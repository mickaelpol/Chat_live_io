$(function(){

	var socket = io();

	$('#chat').submit(function(e){
		e.preventDefault();
		socket.emit('chat message', $('#chatMessage').val());
		$('#chatMessage').val('');
	});

	socket.on('message', function(msg){
		console.log(msg);
		$('#message').prepend('<p class="messageTexte"><strong>'+msg.user+ ' : </strong><div class="tet-primary">' + msg.message + '</div></p>');
	});

	socket.on('service-message', function(user){

		$('#message').prepend('<strong><div class="messageUserco">'+user+' est en ligne !</div></strong>');
	});

	$('#login').submit(function(e){

		e.preventDefault();
		var username = $('#pseudo');
		socket.emit('login', username.val());
		username.val('');
		$('#chat').removeClass('hidden');
		$('#co').addClass('hidden');
	});

});