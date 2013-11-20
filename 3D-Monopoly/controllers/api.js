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

exports.userFriends = function(un, callback){
  User.findOne({ username: un }, function(err, user){
    if(err){
      console.log(err);
      return err;
    }
    if(!user){
      console.log("Unknown user");
      callback("Unknown user");
    }
    else{
      console.log(user + " returned from mongodb");
      var friendlist = user.friends;
      callback(friendlist);
    }
  });
};

exports.addFriendtoDB = function(un, friend, callback){
User.findOne({ username : un }, function(err, user){
if(err){
  console.log(err);
}
if(!user){
  console.log("user not found");
}
else{
  user.friends.push(friend);
  console.log("successful push");
  user.save();
  callback();
}
});

};
