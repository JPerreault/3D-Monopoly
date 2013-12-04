$(function(){
	
	function getFriends(callback){
		$.ajax({
			type: 'GET',
			url : '/get-friends'
		}).done(function(msg){
			callback(msg);
		});
	}

	function getGames(callback){
		$.ajax({
			type: 'GET',
			url : '/get-games'
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

	function loadGames(){
		console.log("getting games list");
		getGames(function(gameslist){
			var gamearray = { games: []};
			console.log(gameslist);
			$.each(gameslist, function(i, dbgame){
				var playerslist = { players: []};
				$.each(dbgame.game.players, function(j, dbplayer){
					playerslist.players.push(dbplayer.playerid);
				});
				gamearray.games.push(playerslist);
				gamearray.games[i].gameID = dbgame.game.gameID;
				gamearray.games[i].currentPlayer = dbgame.game.currentPlayer;
			});
			var srctemplate = $('#game_template').html();
			var displaytemplate = Handlebars.compile(srctemplate);
			$('#game_container').html(displaytemplate(gamearray));
			console.log(gamearray);
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
  
function newGame(players, callback){
$.ajax({
     type: 'POST',
     url : '/add-game',
     data: {friends : players}
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
  
  $('#game_with_friends').on('click',
                      function(event){
                      $(".error").remove();
                      var friends = $('#friend_list').val();
                      newGame(friends, function(data){
                                console.log('New room was created with ID: ' + JSON.stringify(data));
//                                if(data.response == "Friend not found, check name and try again"){
//                                console.log("not found");
//                                $('.login_form').before('<span class="error">'+ data.response + '</span>');
//                                }
//                                else{
//                                var f = new Option();
//                                $(f).html(friend);
//                                $('#friend_list').append(f);
//                                }
                                });
                      return false;
                      });

}

loadFriends();
loadGames();
bindAddFriend();


});