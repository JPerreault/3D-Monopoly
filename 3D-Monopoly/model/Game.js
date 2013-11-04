var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	gid: Number,
	Users: [{
		type: String, ref: 'User'
	}]},
	{ collection: 'games'
});

module.exports = mongoose.model('Game', GameSchema);