//var pidList = [false, false, false, false];
var api = require('../controllers/api.js');
exports.play = function(req, res){
		res.redirect('/login')

    // you need to specificy game now, so just /play won't work
    // try /play-[GameID]. if the game exists it should be in the
    // list of users
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
    socket.on('chance_pos',function(data){
    socket.broadcast.emit('get_chance_pos',data);
    socket.emit('get_chance_pos',data);
    
    });
    
    socket.on('com_chest_pos',function(data){
    socket.broadcast.emit('get_com_chest_pos',data);
    socket.emit('get_com_chest_pos',data);
    });
    
    
    
    socket.on('payload', function (data) {
              console.log(data.gamestate.players);
              console.log(data.gamestate.players[0].position);

              var datId = data.id;
              api.saveGame(data.id, data.gamestate, function(){
                            api.getGameJSON(data.id, function(data){
                                console.log("updating "+socket+" to room "+data.id);
                                socket.broadcast.to(data.id).emit('update', {game: data, firstTime: false});});
                           });
             });
    
    socket.on('disconnect', function (data){
              
//              socket.broadcast.to(data.id).emit('get-message', {message: "Player "+socket.pid+" has disconnected", sender: "null"});
              });
    
    socket.on('post-message', function (data){
              socket.broadcast.to(data.id).emit('get-message', data);
              });
    
    socket.on('add-me-to-game', function (data){
              socket.join(data.id);
              console.log("adding "+socket+" to room "+data.id);
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