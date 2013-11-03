var api = require('../controllers/api.js');


exports.login = function(req, res){
	api.authenticate(req.body.loginname, req.body.loginpass, function(err, user){
    if (user) {
      res.sendfile('gamefiles/monopoly.html');
    } 
    else {
      res.redirect('/login/');
    }
  });
}

exports.register = function(req, res){
	var username = req.body.username;
	var password = req.body.userpass;
	var useremail = req.body.useremail;
	var securityq = parseInt(req.body.userquestion);
	var securityans = req.body.useranswer;
	api.createUser(username, password, useremail, securityq, securityans, res);

};

exports.play = function(req, res){
	if(!req.session){
		res.redirect('/')
	}
	else{
		res.sendfile('gamefiles/monopoly.html');
	}
};