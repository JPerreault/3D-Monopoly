function checkPassword(str)
{
	var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
	return re.test(str);
}


function validateForm()
{
	var username = $('#username').val();
	var userpass = $('#userpass').val();
	var password_repeat = $('#password_repeat').val();
	var useremail = $('#useremail').val();
	var email_repeat = $('#useremail_repeat').val();
	var re = /^\w+$/;
	if(!re.test(username)) {
		$('#account').before('<span class="error"> Username must contain only letters, numbers and underscores!</span>');
		$('#username').focus();
		return false;
	}
	if(useremail != email_repeat){
		$('#email').before('<span class="error"> Emails must match in both fields</span>');
		return false;
	}
	if(userpass != "" && userpass == password_repeat) {
		if(!checkPassword(userpass)) {
			$('#pw').before('<span class="error"> Password should be 6 characters and contain at least 1 capital letter and number</span>');
			$('#userpass').focus();
			return false;
		}
	} else {
		$('#confirmpw').before('<span class="error"> Password does not match above. Check your spelling and try again</span>');
		$('#password_repeat').focus();
		return false;
	}

	return true;
}



$(function(){

	function registerRequest(name, pw, email, callback){
		$.ajax({
			type: 'POST',
			url : '/register',
			data: { username: name, userpass: pw, useremail : email }
		}).done(function(msg){
			callback(msg);
		});

	}





	$("#registration_form").on('submit',function(e){
		e.preventDefault();
		$('.error').remove();
		console.log('clicked');
		if(validateForm()){
			console.log("validated");
			var username = $('#username').val();
			var pw = $('#userpass').val();
			var email = $('#useremail').val();
			registerRequest(username, pw, email, function(response){
				console.log(response.message);
				if(response.message == "Username already taken, try a different name"){
					$('#account').before('<span class="error">' +response.message + '</span>');
				}
				else if(response.message == "Email already in use, try another email"){
					$('#email').before('<span class="error">' + response.message + '</span>');
				}
				else{
					window.location = '/login';
				}
			});
		}
		return false;
	});
});