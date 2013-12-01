var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("../model/User.js");

var PlayerSchema = new Schema({
	playerid: {type: String, required: true, ref: 'User' },
	player_position: {type: Number },
	player_properties: [{type: Number } ],
	player_cash: {type: Number }
	});

var GameSchema = new Schema({
	finished: { type: Boolean, required: true, default: false },
	players: [PlayerSchema],
	currentplayer: { type: String, required: true, default: 'sahoffma' }},
	{ collection: 'games'
});

//Export Game model
module.exports = mongoose.model('Game', GameSchema);