var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username:  String,
	password: String,
	email:  String,
	securityq: Number,
	securityanswer: String,
	UserGames: {
	gid1: Number,
	gid2: Number,
	gid3: Number,
	gid4: Number
	}},
	{ collection: 'users'
});


module.exports = mongoose.model('User', UserSchema);