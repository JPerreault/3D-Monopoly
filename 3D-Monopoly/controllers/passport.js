var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , mongoose = require('mongoose')
  , db = require("../model/User.js");



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(un, pw, done) {
  db.userModel.findOne({ username: un }, function(err, user) {
    if (err) { 
      console.log(err);
      return done(err); }
    if (!user) { 
      console.log("Unknown User");
      return done(null, false, { message: 'Unknown user ' + username }); 
    }
    user.comparePassword(pw, function(err, isMatch) {
      if (err) {
       console.log(err);
       return done(err);
     }
      if(isMatch) {
        return done(null, user);
      } else {
        console.log("Invalid password");
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));



exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};

