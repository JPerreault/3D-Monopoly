var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("../model/User.js");

var GameSchema = new Schema({
	finished: { type: Boolean, required: true, default: false },
	players: [ { playerid: {type: String, required: true, ref: 'User'} },
			   { player_position: {type: Number, required: true } },
			  { player_properties: [{type: Number} ] },
			  { player_cash: {type: Number, required: true} }] },
	{ collection: 'games'
});

//Export Game model
module.exports = mongoose.model('Game', GameSchema);