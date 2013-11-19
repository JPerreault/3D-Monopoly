var api = require('../controllers/api.js');


exports.login = function(req, res){
  if(req.user != undefined){
   res.redirect('/hub');
 }
 else{
  res.render('login.ejs', { layout: 'mainpagelayout', title: 'Login' });
}
};

exports.contact = function(req, res){
  if(req.user != undefined){
    res.redirect('/hub');
  }
  else{
    res.render('contact.ejs', { layout: 'mainpagelayout', title: 'Contact' });
  }

};

exports.register = function(req, res){
	if(req.user != undefined){
   res.redirect('/hub');
 }
 res.render('register.ejs', { layout: 'mainpagelayout', title: 'Register' });
 
};

exports.screenshots = function(req, res){

  res.render('screenshots.ejs', { layout: 'mainpagelayout', title: 'Screenshots' });
  
};
exports.hub = function(req, res){
  if(req.user == undefined){
   res.redirect('/login');
 }
 else{
   res.render('hub', {title: 'Hub', user: req.user.username });
 }
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/login');

};

exports.friendload = function(req, res){
  console.log("Loading: " + req.user.username + "'s friends");
  api.userFriends(req.user.username, function(data){
    if(data == "Unknown user"){
      res.send("Unknown user");
    }
    else{
      var friendlist = data;
      res.send(friendlist);
    }

  });
};
