
/*
 * GET home page.
 */

exports.home = function(req, res){
  res.sendfile('public/staticHTML/home.html');
};