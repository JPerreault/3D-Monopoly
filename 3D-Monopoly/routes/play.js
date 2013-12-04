//var pidList = [false, false, false, false];
var api = require('../controllers/api.js');
exports.play = function(req, res){
//	if(req.user == undefined){
//		res.redirect('/login')
//	}
//	else{
       //api.createGame();
    res.render('game.ejs', {signedIn: false});
    
        
        
//	}
    // commented this stuff for now so it's easier to test gameplay
};

exports.load = function(req, res){
   if(req.user == undefined){
   	res.redirect('/login')
   }
   else{
    
    res.render('game.ejs', {gameID: req.params.id, username: req.user.username, signedIn: true});
    
    	}
};


exports.connected = function(socket)
{
    
    socket.on('payload', function (data) {
              console.log(data.gamestate.players);
              console.log(data.gamestate.players[0].position);

              api.saveGame(data.id, data.gamestate, function(){
                            api.getGameJSON(data.id, function(data){
                                            socket.broadcast.to(data.id).emit('update', {game: data, firstTime: false});});
                           });
             });
    
    socket.on('disconnect', function (data){
              
//              pidList[socket.pid] = false;
              
              socket.broadcast.emit('get-message', {message: "Player "+socket.pid+" has disconnected", sender: "null"});
              });
    
    socket.on('post-message', function (data){
              socket.broadcast.emit('get-message', data);
              });
    
    socket.on('add-me-to-game', function (data){
              socket.join(data.id);
              socket.pid = data.name;
              api.getGameJSON(data.id, function(data){
                              socket.emit('update', {game: data, firstTime: true});
                              socket.broadcast.to(data.id).emit('get-message', {message: "Player "+(socket.pid)+" has connected", sender: "null"});
});
              });
}

//function getMostAvailablePID()
//{
//    for (var x=0; x<pidList.length; x++)
//        if (!pidList[x])
//        {
//            pidList[x] = true;
//            return x;
//        }
//    
//    return "?";
//}