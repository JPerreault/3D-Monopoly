var mongoose = require('mongoose');
var User = require('../model/User.js');
var Game = require('../model/Game.js');

exports.authenticate = function(name, pass, fn) {

var db = mongoose.connection;
var users = db.collection('users');
  users.findOne ({username: name, password : pass }, function(err, user) {
    if (!user){
    	return fn(new Error('cannot authenticate user'), null);
    	}
    else{
    	return fn(null, user);
    	}
	});
}

exports.createUser = function(un, pw, useremail, securityquestion, securityans, res) {

	var db = mongoose.connection;
	var newUser = new User({
	username: un, 
	password: pw, 
	email: useremail, 
	securityq: securityquestion,
	securityanswer: securityans
	});

	newUser.save( function(err){
		if(err){
			res.send("Duplicate User")
		}
	});
	res.redirect('/login/');
}
	
