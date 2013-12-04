var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("../model/User.js");

var PlayerSchema = new Schema({
	playerid: {type: String, required: true, ref: 'User' },
    position: {type: Number, required: true, default: '0'},
	properties: [{type: Number } ],
	money: {type: Number }
	});

var GameSchema = new Schema({
//    id: {type: String, required: true, default: "nope" },
	finished: { type: Boolean, required: true, default: false },
	players: [PlayerSchema],
	currentplayer: { type: String, required: true, default: 'sahoffma' }},
	{ collection: 'games'});

//Export Game model
module.exports = mongoose.model('Game', GameSchema);