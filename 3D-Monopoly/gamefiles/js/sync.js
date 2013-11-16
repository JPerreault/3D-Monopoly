var socket;
var finalPlayerID;

function initalConnect()
{
    document.getElementById("status").innerHTML = "Connecting...";

    socket = io.connect('http://localhost');
    socket.on('init', function (data) {
              var player = data.hello;
              currentPlayer = parseInt(player)-1;
              finalPlayerID = currentPlayer;
              
              updateStatus("Connected as Player "+currentPlayer);
             // socket.emit('my other event', { my: 'data' });
              });
    socket.on('update', function(data){
              
              var otherPlayer = parseInt(data.pid);
              var spaces = parseInt(data.pos)-players[otherPlayer].playerPosition;
    
              if (spaces <0)
                spaces += 40;
    
              move(players[otherPlayer].piece, players[otherPlayer].playerPosition, spaces);
    
              console.log("moved player "+otherPlayer+" a total of "+spaces+" spaces to "+data.pos);
              });
    
    socket.on('disconnect', function(data){
              updateStatus("Disconnected");
              });
}

function sync()
{
    socket.emit('payload', {pid: currentPlayer, pos: players[currentPlayer].playerPosition});
}

function updateStatus(string)
{
    document.getElementById("status").innerHTML = string;
    document.getElementById("debugstatus").innerHTML = string;

}