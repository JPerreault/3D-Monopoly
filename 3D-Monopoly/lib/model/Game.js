var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	gid: Number,
	Users: {
		User1: [{
		money: Number
		}],
		User2: [{
		money: Number
		}],
		User3: [{
		money: Number
		}],
		User4: [{
		money: Number
		}]
	}
});

module.exports = mongoose.model('Game', GameSchema);