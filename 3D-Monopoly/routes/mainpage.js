


exports.login = function(req, res){
	if(!req.session){
		res.redirect('/home/')
	}
	else{
  res.render('login.ejs', { layout: 'mainpagelayout', title: 'Login' });
   }
};

exports.contact = function(req, res){
	if(!req.session){
		res.redirect('/home/')
	}
	else{
  res.render('contact.ejs', { layout: 'mainpagelayout', title: 'Contact' });
   }
};

exports.register = function(req, res){
	if(!req.session){
		res.redirect('/home/')
	}
	else{
  res.render('register.ejs', { layout: 'mainpagelayout', title: 'Register' });
   }
};

exports.screenshots = function(req, res){
	if(!req.session){
		res.redirect('/home/')
	}
	else{
  res.render('screenshots.ejs', { layout: 'mainpagelayout', title: 'Screenshots' });
   }
};
exports.hub = function(req, res){
    if(!req.session){
	res.redirect('/home');
    }
    else{
	res.render('hub', {title: '3D Monopoly' });
    }
};
