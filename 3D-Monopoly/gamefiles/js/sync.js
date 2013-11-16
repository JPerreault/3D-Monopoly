var socket;
var finalPlayerID;

function initalConnect()
{
    document.getElementById("status").innerHTML = "Connecting...";

    socket = io.connect('http://localhost');
    socket.on('init', function (data) {
              var player = data.hello;
              currentPlayer = parseInt(player);
              finalPlayerID = currentPlayer;
              username = "Player "+currentPlayer;
              
              updateStatus("Connected as Player "+currentPlayer);
              chatMessage("You have connected", null);

             // socket.emit('my other event', { my: 'data' });
              });
    
    socket.on('get-message', function(data)
              {
              chatMessage(data.message, data.sender);
              });
    
    
    socket.on('update', function(data){
              
              var otherPlayer = parseInt(data.pid);
              var spaces = parseInt(data.pos)-players[otherPlayer].playerPosition;
    
              if (spaces <0)
                spaces += 40;
    
              move(players[otherPlayer].piece, players[otherPlayer].playerPosition, spaces);
              
              players[otherPlayer].properties = data.prop;
              players[otherPlayer].money = parseInt(data.cash);
              
              
              console.log("moved player "+otherPlayer+" a total of "+spaces+" spaces to "+data.pos);
              });
    
    socket.on('disconnect', function(data){
              updateStatus("Disconnected");
              });
    
    initChat();
}

function sync()
{
    socket.emit('payload', {pid: currentPlayer, pos: players[currentPlayer].playerPosition, prop: players[currentPlayer].properties, cash: players[currentPlayer].money});
}

function updateStatus(string)
{
    document.getElementById("status").innerHTML = string;
    document.getElementById("debugstatus").innerHTML = string;

}

function postMessage(string)
{
    socket.emit('post-message', {message: string, sender: username});
}