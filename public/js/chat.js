$(function(){

	var socket = io();

	$('#input').html('<div class="container">\
		<div class="row">\
		<div class="col-xs-5">\
		<form id="chat" action="">\
		\
		<label for="pseudo">Pseudo <br>\
		<input id="pseudo" type="text">\
		</label> <br>\
		\
		<label for="message">Message <br>\
		<input id="message" placeholder="tape ton message ici" type="text">\
		</label> <br>\
		\
		\
		<input hidden="hidden" type="submit">\
		</form>\
		</div>\
		<div class="col-xs-7">\
		<span id="erreur"></span>\
		</div>\
		</div>\
		</div>');

	$('#text-area').html('<div class="container">\
		<div class="col-xs-12">\
		<div id="text-chat"></div>\
		</div>\
		</div>');

		var form = $('#chat').submit(function(e){ // recuperer se qui va etre placé dans l'input
			e.preventDefault()
			var msg = $('#message');
			var pseudo = $('#pseudo').val();

			socket.emit('message-send', [pseudo,msg.val()]);

			// $('#text-chat').append('<div class="text-primary">'+ pseudo + ' : <span class="text-danger">'+ " " +msg.val()+ '</span></div>');
			msg.val("");
		});

		socket.on('message-send', function(msg){
			console.log(msg);
			$('#text-chat').append('<div class="text-primary">'+ msg[0] + ' : <span class="text-danger">'+ " " +msg[1]+ '</span></div>');
		});


	});


// si quand je valide mon formulaire #chat
// 	 et si #pseudo est vide 
// 		alors je renvoi une erreur 

// 		sinon j'execute ma fonction