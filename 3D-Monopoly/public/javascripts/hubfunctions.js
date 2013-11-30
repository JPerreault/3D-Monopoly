$(function(){
	
	function getFriends(callback){
		$.ajax({
			type: 'GET',
			url : '/get-friends'
		}).done(function(msg){
			callback(msg);
		});
	}

	function loadFriends(){
		console.log("getting friends list");
		getFriends(function(data){
			var friendarray = { friends: [] };
			$.each(data, function(i, item){
				friendarray.friends.push(item);
			});
			console.log(friendarray.friends);
			var srctemplate = $('#friend_template').html();
			var displaytemplate = Handlebars.compile(srctemplate);
			$('#friend_list').html(displaytemplate(friendarray));
			return false;
		});
	}

	function newFriend(newfriend, callback){
		$.ajax({
			type: 'POST',
			url : '/add-friend', 
			data: {friend : newfriend}
		}).done(function(msg){
			callback(msg);
		});
	}

	function bindAddFriend() {

		$('#add_friend').on('click',
                function(event){
				$(".error").remove();
				var friend = $('#friend_entry').val();
				newFriend(friend, function(data){
					console.log('Received friend response: ' + JSON.stringify(data));
					if(data.response == "Friend not found, check name and try again"){
						console.log("not found");
						$('.login_form').before('<span class="error">'+ data.response + '</span>');
					}
					else{
						var f = new Option();
						$(f).html(friend);
						$('#friend_list').append(f);
					}
				});
				return false;
			});
	}

	loadFriends();
	bindAddFriend();


});