


exports.login = function(req, res){
  if(typeof req.user != undefined || typeof req.user != false){
	res.redirect('/hub');
    }
   else{
  res.render('login.ejs', { layout: 'mainpagelayout', title: 'Login' });
 }
};

exports.contact = function(req, res){
   else{
  res.render('contact.ejs', { layout: 'mainpagelayout', title: 'Contact' });
}

};

exports.register = function(req, res){
	if(typeof req.user != undefined || typeof req.user != false){
	res.redirect('/hub');
    }
  res.render('register.ejs', { layout: 'mainpagelayout', title: 'Register' });
   
};

exports.screenshots = function(req, res){

  res.render('screenshots.ejs', { layout: 'mainpagelayout', title: 'Screenshots' });
   
};
exports.hub = function(req, res){
    if(typeof req.user == undefined || typeof req.user == false){
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
