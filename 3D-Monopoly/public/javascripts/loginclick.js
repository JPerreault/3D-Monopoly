$(function(){

	function loginRequest(name, pw, callback){
		$.ajax({
			type: 'POST',
			url : '/login',
			data: { username: name, password: pw }
		}).done(function(msg){
			callback(msg);
		});

	}


	function bindLogin(){ 
		$(".register").on('click', function(e){
			e.preventDefault();
			$('.error').remove();
			var login = $('#username').val();
			var pw = $('#password').val();
			loginRequest(login, pw, function(response){
				console.log(response);
				if(response.message == "Incorrect login details, try again"){
					$('#account').before('<span class="error"> Invalid login credentials, try again.</span>');
				}
				else{
					window.location = "/hub";
				}
			});
			return false;
		});
	}

	bindLogin();
});