$(function(){

	function resetRequest(useremail, callback){
		$.ajax({
			type: 'POST',
			url : '/forgot',
			data: {email : useremail}
		}).done(function(msg){
			callback(msg);
		});

	}

	function bindReset(){
		$('#recovery_form').on('submit', function(e){
			e.preventDefault();
			var email = $('#useremail').val();
			resetRequest(email, function(response){
				console.log(response);
			$('#email').after('<span>' + response + '</span>');
			});
			return false;
		});
	}

	bindReset();
});