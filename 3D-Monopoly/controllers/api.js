var mongoose = require('mongoose');
var User = require('../model/User.js');
var Game = require('../model/Game.js');

exports.createUser = function(un, pw, useremail, callback){

  User.findOne({ username: un}, function(err, user){
    if(err){
     return console.log(err);
   }
   if(user){
    return callback({message: "Username already taken, try a different name"});
  }
  else{
    User.findOne({ email: useremail }, function(err, em){
      if(err){
        return console.log(err);
      }
      if(em){
       return callback({message : "Email already in use, try another email"});
     }
     else{
      var newUser = new User({
       username: un,
       email: useremail,
       password: pw,
     });
      newUser.save( function(err) {
        if(err){
         return callback(err);
       }
       else{
        return callback(null);
      }
    });
    }
  });
  }
});
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

  User.findOne({ username : friend }, function(err, user){
    if(err){
      console.log(err);
    }
    if(!user){
      console.log("user not found");
    }
    else{
      user.friends.push(un);
      console.log("successful push");
      user.save();
      callback();
    }
  });

};

exports.updateUser = function(un, newpass, newemail, callback){
  User.findOne({email: newemail}, function(err, em){
    if(err){
      console.log(err);
    }
    if(em){
      console.log("Email already in use");
      callback({message : "Email already in use"})
    }
    else{
      User.findOne({username: un}, function(err, user){
        if(err){
          console.log(err);
        }
        if(!user){
          console.log("User not found");
        }
        else{

          if(newpass != ""){
            user.password = newpass;
          }
          if(newemail != ""){
            user.email = newemail;
          }
          user.save();
          callback({message : "Profile successfully updated"});
        }
      });
    }

  });
};
