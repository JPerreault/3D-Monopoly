$(function(){
	var srctemplate = $('#game_template').html();
	var displaytemplate = Handlebars.compile(srctemplate);

	function getGames(callback){
		$.ajax({
			type: 'GET',
			url : '/get-all-games'
		}).done(function(msg){
			callback(msg);
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
			
			$('#game_container').html(displaytemplate(gamearray));
			console.log(gamearray);
		});
		setTimeout(loadGames, 30000);
	}

	loadGames();


});