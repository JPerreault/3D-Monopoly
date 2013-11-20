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
   api.createUser(username, password, useremail, function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/login');
    }
  });

 };

 exports.addfriend = function(req, res){
  var newfriend = req.body.friend;
  var user = req.user.username;
  console.log("Attempting to save friend: " + newfriend + " to " + user +"'s document");
  api.addFriendtoDB(req.user.username, newfriend, function(){
    
    res.send({response: "success"});
    
  });
};

exports.updateprofile = function(req, res){
  var newpass = req.body.userpass;
  var newemail = req.body.useremail;
  api.updateUser(req.user.username, newpass, newemail, function(){
    console.log("profile succesfully updated");
    res.redirect('/profile');
  });

};
