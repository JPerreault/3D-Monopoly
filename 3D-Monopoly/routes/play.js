var pidList = [false, false, false, false];

exports.play = function(req, res){
//	if(req.user == undefined){
//		res.redirect('/login')
//	}
//	else{
        res.render('game.ejs', { });
//	}
    // commented this stuff for now so it's easier to test gameplay
};

exports.connected = function(socket)
{
    var pid = getMostAvailablePID();
    
    socket.pid = pid;
    
    socket.emit('init', { hello: pid });
    socket.broadcast.emit('get-message', {message: "Player "+(pid)+" has connected", sender: "null"});
    
    socket.on('payload', function (data) {
            socket.broadcast.emit('update', data);
             });
    
    socket.on('disconnect', function (data){
              
              pidList[socket.pid] = false;
              
              socket.broadcast.emit('get-message', {message: "Player "+socket.pid+" has disconnected", sender: "null"});
              });
    
    socket.on('post-message', function (data){
              socket.broadcast.emit('get-message', data);
              });
}

function getMostAvailablePID()
{
    for (var x=0; x<pidList.length; x++)
        if (!pidList[x])
        {
            pidList[x] = true;
            return x;
        }
    
    return "?";
}