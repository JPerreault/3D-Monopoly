 var passport = require('passport')
   , api = require('../controllers/api.js')

exports.login = function(req, res, next){
	passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      console.log(info.message);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/hub');
    });
  })(req, res, next);
};

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