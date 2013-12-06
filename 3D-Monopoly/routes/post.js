 var passport = require('passport')
 , api = require('../controllers/api.js')
 , nodemailer = require("nodemailer");


 exports.login = function(req, res, next){
   passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
      if (!user) {
        req.session.messages =  [info.message];
        console.log(info.message);
        return res.send({message : info.message});
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(null);
      });
    })(req, res, next);
  };

  exports.register = function(req, res){
   console.log(req.body);
   var username = req.body.username;
   var password = req.body.userpass;
   var useremail = req.body.useremail;
   api.createUser(username, password, useremail, function(err){
    res.send(err);
  });

 };

 exports.addfriend = function(req, res){
  var newfriend = req.body.friend;
  var user = req.user.username;
  console.log("Attempting to save friend: " + newfriend + " to " + user +"'s document");
  api.addFriendtoDB(req.user.username, newfriend, function(response){

    res.send(response);
    
  });
};

exports.addpublicgame = function(req, res){
var player = [];
console.log("got here");
player.push(req.user.username);
api.createGame(player, function(response){
  res.redirect("/hub");
});

};

exports.addgame = function(req, res){
    var friends = req.body.friends;
    var user = req.user.username;
    console.log("Got list of users : " + friends + " to make a game with " + user +"'s account");
    friends.push(user);
    api.createGame(friends, function(response){
                      
                      res.send(response);
                      
                      });
};

exports.updateprofile = function(req, res){
  var newpass = req.body.userpass;
  var newemail = req.body.useremail;
  api.updateUser(req.user.username, newpass, newemail, function(message){
    res.send(message);
  });

};

exports.contact = function(req, res){
  var subject = req.body.subject;
  var email = req.body.email;
  var body = req.body.senttext;

  var transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      //input username and password for gmail, requires some setup in your acct
      user: "example@gmail.com",
      pass: "password"
    }
  });
  var mailOptions = {
    from: email , // sender address 
    to: "example@gmail.com", // list of receivers
    subject: "Monopoly feedback", // Subject line
    text: "Email: " + email +"\nSubject: " + subject +"\nBody: " + body, // plaintext body
  }

  transport.sendMail(mailOptions, function(err, response){
    if(err){
      console.log(err);
      res.send({message: err});
    }
    else{
      console.log("Message was sent: " + response.message);
      res.send({message: "success"});
    }
  });
};
