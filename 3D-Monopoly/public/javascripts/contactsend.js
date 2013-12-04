$(function(){

	function emailRequest(useremail, emailsubject, textbody, callback){
		$.ajax({
			type: 'POST',
			url : '/contact',
			data: { email : useremail, subject : emailsubject, senttext : textbody }
		}).done(function(msg){
			callback(msg);
		});

	}



	$("#contact").on('submit',function(e){
		e.preventDefault();
		var email = $('#email').val();
		var subject = $('#subject').val();
		var textbox = $('#textbox').val();
		emailRequest(email, subject, textbox, function(response){
			console.log(response);
		});
		return false;
	});
});