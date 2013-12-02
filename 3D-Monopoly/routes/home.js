exports.accountRecovery = function(req, res){

	res.sendfile('public/staticHTML/forgot.html');

};
exports.home = function(req, res){
  res.sendfile('public/staticHTML/home.html');
};