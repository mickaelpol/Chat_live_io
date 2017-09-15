$(function(){

	var socket = io();

	$('#chat').submit(function(e){
		e.preventDefault();
		socket.emit('chat message', $('#chatMessage').val());
		$('#chatMessage').val('');
	});

	socket.on('message', function(msg){
		console.log(msg);
		$('#message').prepend('<p><strong class="text-primary">'+msg.user+ ' : </strong><span class="text-success">' + msg.message + '</span></p>');
	});

	socket.on('service-message', function(user){

		$('#message').prepend('<strong><div class="text-success">'+user+' est en ligne !</div></strong>');
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