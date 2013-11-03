var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username:  String,
	password: String,
	email:  String,
	securityq: Number,
	securityanswer: String,
	usergames: [{
		type: Number, ref: 'Game'
		}]},
	{ collection: 'users'
});


module.exports.User = mongoose.model('User', UserSchema);