

exports.login = function(req, res){
	if(!req.session){
		res.redirect('/')
	}
	else{
		res.sendfile('/gamefiles/monopoly.html');
	}
};

exports.register = function(req, res){
	if(!req.session){
		res.redirect('/')
	}
	else{
		console.log(JSON.stringify(req.body));
		console.log(JSON.stringify(req.body.username));
		res.send('yes bby');
	}
};

exports.play = function(req, res){
	if(!req.session){
		res.redirect('/')
	}
	else{
		res.sendfile('gamefiles/monopoly.html');
	}
};