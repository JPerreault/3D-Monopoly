var mongoose = require('mongoose');
var User = require('../model/User.js');
var Game = require('../model/Game.js');

exports.createUser = function(un, pw, useremail, res){

  var newUser = new User({
     username: un,
     email: useremail,
     password: pw,
    });

     newUser.save( function(err) {
        if(err){
          res.send(err);
        }
     });
   res.redirect('/login');
};
