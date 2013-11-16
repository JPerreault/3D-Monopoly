var connectCounter = 0;

exports.play = function(req, res){
	if(!req.session){
		res.redirect('/')
	}
	else{
        res.render('game.ejs', { });
	}
};

exports.connected = function(socket)
{
    connectCounter ++;
    
    socket.emit('init', { hello: connectCounter });
    socket.on('payload', function (data) {
            socket.broadcast.emit('update', data);
             });
    
    socket.on('disconnect', function (data){
              connectCounter --;
              });
}
