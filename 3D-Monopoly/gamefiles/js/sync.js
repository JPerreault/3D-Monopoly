var socket;
var finalPlayerID;

function initalConnect()
{
    document.getElementById("status").innerHTML = "Connecting...";

    socket = io.connect('http://localhost/');
    username = loadedName;
    
    socket.on('get-message', function(data)
              {
              chatMessage(data.message, data.sender);
              });
    
    
    socket.on('update', function(data){

              for (var x=0; x<data.game.players.length; x++)
              {
              var oldPosition = players[x].playerPosition;
              
                players[x].username = data.game.players[x].playerid;
                players[x].properties = data.game.players[x].properties;
                players[x].money = parseInt(data.game.players[x].money);
              players[x].playerPosition = data.game.players[x].position;
              
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
              
              }
              
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
    for (var x=0; x<players.length; x++)
    {
        var newp = {};
        newp.position = players[x].playerPosition;
        newp.properties = players[x].properties;
        newp.money = players[x].money;
        players2.push(newp);
    }
    var gamestate = {players: players2};
    console.log(players2);
    socket.emit('payload', {id: gameID, gamestate: gamestate});

}

function updateStatus(string)
{
    document.getElementById("status").innerHTML = string;
    document.getElementById("debugstatus").innerHTML = string;

}

function postMessage(string)
{
    socket.emit('post-message', {message: string, sender: username, id: gameID});
}