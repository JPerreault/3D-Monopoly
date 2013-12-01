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
  
  res.render('contact.ejs', { layout: 'mainpagelayout', title: 'Contact' });
  

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

 res.render('mainhub.ejs', {layout: 'hublayout', title: 'Hub', user: req.user.username });
};

exports.getprofile = function(req, res){

  res.render('profile.ejs', {layout: 'hublayout', title: 'Profile', user: req.user.username});

};

exports.lobby = function(req, res){

  res.render('lobby.ejs', {layout: 'hublayout', title: 'Lobby', user: req.user.username });
}

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

exports.gameload = function(req, res){
console.log("Loading games.");
api.loadGames(req.user.username, function(response){
if(response == "No games found"){
  res.send("No games found");
}
else{
  console.log(response);
  res.send(response);
}

});

};

exports.catch404 = function(req, res){
  res.render('404', {layout: 'mainpagelayout', title:'Not Found'},
    function(err,str) { 
      res.send(str,404); 
    }); 
};