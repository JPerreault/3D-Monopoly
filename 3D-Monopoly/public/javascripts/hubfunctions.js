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
		getFriends(function(data){
			var friends = data.friends;
			$.each(friends, function(i, item){
				var f = new Option();
				$(f).html(item);
				$('#friend_list').append(f);
			});

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

		$('#add_friend').bind('click',
			function(event){
				var friend = $('#friend_entry').val();
				newFriend(friend, function(data){
					console.log('Received friend response: ' + JSON.stringify(data));
						var f = new Option();
						$(f).html(friend);
						$('#friend_list').append(f);
				});
				return false;
			});
	}

	loadFriends();
	bindAddFriend();


});