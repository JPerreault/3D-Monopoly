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

  User.findOne({ username : friend }, function(err, foundfriend){
    if(err){
      console.log(err);
    }
    if(!foundfriend){
      console.log("user not found");
      callback({response: "Friend not found, check name and try again"});
    }
    else{
      foundfriend.friends.push(un);
      console.log("successful push");
      foundfriend.save();
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
          callback({response : "success"});
        }
      });


    }
  });

};

exports.createGame = function(players, callback){
    var newgame = new Game();
    for (var x=0; x<players.length; x++)
        newgame.players.push({playerid: players[x]});

      if(newgame.players.length < 4){
        newgame.open = true;
      }
      else{
        newgame.open = false;
      }
    
    newgame.currentplayer = newgame.players[0].playerid;
    
    newgame.save(function()
                 {
                 callback(newgame);
                 });
    
    

};

exports.addUsertoGame = function(un, gameid, callback){
  var gameident = String(gameid);
  console.log(gameid);
  Game.findOne({'_id': gameident}, function(err, game){
    if(err){
      console.log(err);
    }
    else{
      game.players.push({playerid: un});
      if(game.players.length == 4){
        game.open = false;
      }
      game.save();
      callback();
    }
  });


};

exports.saveGame = function(id, gamestate, callback)
{
    Game.findOne({'_id': id}, function(err, game){
                 if (err){console.log(err);}
                 if (game)
                 {
                 for (var x=0; x<game.players.length; x++)
                 {
                 game.players[x].money = gamestate.players[x].money;
                 game.players[x].properties = gamestate.players[x].properties;
                 game.players[x].position = gamestate.players[x].position;
                 console.log("active: "+gamestate.active);
                 game.currentplayer = gamestate.active;
                 //console.log(game.players[x].position);
                 //game.players[x].save();
                 }
                 game.save();
                 callback();
                 }
                 });
}

exports.getGameJSON = function(id, callback)
{
    Game.findOne({'_id': id}, function(err, games){
                 if (err){console.log(err);}
                 if (games)
                 {
                          var output   =   {
                                "players": games.players,
                                "gameID" : games._id,
                                "active" : games.currentplayer,
                                "id" : id
                                }
                     callback(output);
                 }
              });
};

exports.loadPlayerGames = function(un, callback){
  Game.find({'players.playerid': un}, function(err, games){
    if(err){
      console.log(err);
    }
    if(!games){
      callback("No games found");
    }
    else{
      var array = [];
      for(var i = 0; i < games.length; i++){
        array.push(  
         { 
          "game": {
          "players": games[i].players,
          "gameID" : games[i]._id, 
          "active" : games[i].currentplayer
        }});
      }
      console.log(array);
      callback(array);
    }

  });

};

exports.loadServerGames = function(callback){

Game.find({'open': true}, function(err, games){
    if(err){
      console.log(err);
    }
    if(!games){
      callback("No games found");
    }
    else{
      var array = [];
      for(var i = 0; i < games.length; i++){
        array.push(  
         { 
          "game": {
          "players": games[i].players,
          "gameID" : games[i]._id, 
          "active" : games[i].currentplayer
        }});
      }
      console.log(array);
      callback(array);
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
