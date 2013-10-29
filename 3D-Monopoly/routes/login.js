
/*
 * GET home page.
 */

exports.main = function(req, res){
	if(!req.session){
		res.redirect('/home/')
	}
	else{
  res.render('mainpage', { title: '3D Monopoly' });
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
