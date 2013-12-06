var socket;
var finalPlayerID;

function isItYourTurn()
{
    return (activePlayer == username);
}

function changeHands()
{
    if (!isItYourTurn())
    {
        //not your turn
        $(".buttonsthatdie").fadeTo(0, .2);
        $(".buttonsthatdie").removeClass('clickable');

        $("#fadespan").fadeTo(0, .2);
    }
    else
    {
        // your turn
        $(".buttonsthatdie").fadeTo(0, 1);
        $("#fadespan").fadeTo(0, 1);
        $(".buttonsthatdie").addClass('clickable');

    }
}

function initalConnect()
{
    document.getElementById("status").innerHTML = "Connecting...";

    socket = io.connect();
    username = loadedName;
    
    socket.on('get-message', function(data)
              {
              chatMessage(data.message, data.sender);
              });
    
    socket.on('get_chance_pos',function(data){
    chance_pos = data.chance;
    });
    
    socket.on('get_com_chest_pos',function(data){
    community_chest_pos = data.com_chest;
    }
    );
    
    socket.on('update', function(data){

              for (var x=0; x<data.game.players.length; x++)
              {
              console.log("Players in game: "+data.game.players.length);
              var oldPosition = players[x].playerPosition;
              
                players[x].username = data.game.players[x].playerid;
                players[x].properties = data.game.players[x].properties;
                players[x].money = parseInt(data.game.players[x].money);
              players[x].playerPosition = data.game.players[x].position;
              players[x].username = data.game.players[x].playerid;
              activePlayer = data.game.active;
              
              if (data.game.houses.length != 0)
                houses = data.game.houses;
              
              for (var y=0; y<houses.length; y++)
              {
                    for (var z=0; z<houses[y]; z++)
              buyHouse(y, true);
              }
              
              if (data.game.players[x].playerid == username)
              {
                currentPlayer = x;
              }
              
              var spaces = parseInt(players[x].playerPosition)-oldPosition;
             if (spaces <0)
               spaces += 40;
              
              move(players[x].piece, oldPosition, spaces);

              }
              
              console.log(data.firstTime);
              
              if (data.firstTime)
              {
              finalPlayerID = currentPlayer;
              updateStatus("Connected as Player "+currentPlayer);
              chatMessage("You have connected", null);
              numberOfPlayers = data.game.players.length;
              
              // remove other players
              for (var x=numberOfPlayers; x<4; x++)
                scene.remove(players[x].piece)
              
              lockCamera();
              
              hideLoading();

              }
              
              updateDisplay();
              
              changeHands();
              
//              var otherPlayer = parseInt(data.pid);
//              var spaces = parseInt(data.pos)-players[otherPlayer].playerPosition;
//    
//              if (spaces <0)
//                spaces += 40;
//    
//              move(players[otherPlayer].piece, players[otherPlayer].playerPosition, spaces);
//              
//              players[otherPlayer].properties = data.prop;
//              players[otherPlayer].money = parseInt(data.cash);
//              
//              
//              console.log("moved player "+otherPlayer+" a total of "+spaces+" spaces to "+data.pos);
              });
    
    socket.on('disconnect', function(data){
              updateStatus("Disconnected");
              });
    
    socket.emit('add-me-to-game', { id: gameID, name: username });

    
    initChat();
}

function sync()
{
    var players2 = [];
    for (var x=0; x<numberOfPlayers; x++)
    {
        var newp = {};
        newp.position = players[x].playerPosition;
        newp.properties = players[x].properties;
        newp.money = players[x].money;
        newp.playerid = players[x].username;
        players2.push(newp);
    }
    console.log("the guy is - "+activePlayer);
    var gamestate = {players: players2, active: activePlayer, houses: houses};
    console.log(players2);
    socket.emit('payload', {id: gameID, gamestate: gamestate});

}

function updateStatus(string)
{
    document.getElementById("status").innerHTML = string;
    document.getElementById("debugstatus").innerHTML = string;

}

function postMessage(string, rollService)
{
    if (typeof rollService !== 'undefined')
        sendGuy = null;
    else
        sendGuy = username;
        
    socket.emit('post-message', {message: string, sender: sendGuy, id: gameID});
}