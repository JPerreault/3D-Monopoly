var mongoose = require('mongoose');
var Game = require('../lib/model/Game.js');
var User = require('../lib/model/User.js');

exports.createUser = function(req, res) {
	mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    var users = db.collection('users');
	var newUser = new User({
	username: req.body.username, 
	password: req.body.password, 
	email: req.body.email, 
	securityq: 1,
	securityanswer: req.body.useranswer
	});

	newUser.save( function(err){
		if(err){
			throw(err);
		}
	});

	res.redirect('/login/');
}
	
