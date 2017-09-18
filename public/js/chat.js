$(function(){

	
	// var avatar = '<img class="avatar" src="https://api.adorable.io/avatars/40/'+random+'"/>';
	// console.log(avatar);
	

	var socket = io();

	$('#chat').submit(function(e){
		e.preventDefault();
		// fonction qui gere si les inputs des messages et vide ou pas  
		if ($('#chatMessage').val()!==("")) {
			socket.emit('chat message', $('#chatMessage').val());
			$('#chatMessage').val('');
		} else {
			$('#erreurMessage').html('<p class="text-danger">Veuillez entrer un message</p>');
		}
		
	});

	socket.on('message', function(msg){
		// fonction qui gere les envois de message dans le chat
		// var imageUser = avatar+ " "+;
		
		$('#message').prepend('<p><strong class="text-primary">'+msg.user+ ' : </strong><span class="text-success">' + msg.message + '</span></p>');
	});

	socket.on('service-message', function(user){
		// fonction qui gere quand une personne se connecte sur le chat
		$('#message').prepend('<strong><div class="text-success">'+user+' est en ligne !</div></strong>');
	});

	$('#login').submit(function(e){

		e.preventDefault();
		var username = $('#pseudo');

		if ($('#pseudo').val()!==('')) {
			socket.emit('login', username.val());
			username.val('');
			$('#chat').removeClass('hidden');
			$('#co').addClass('hidden');
		} else {
			$('#erreurPseudo').html('<p class="text-danger">Veuillez entrez un pseudo</p>');
		}
		
		
	});

});