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
   // socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
             console.log(data);
            socket.broadcast.emit(data);
             });
}