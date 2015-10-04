var mongoose = require('mongoose');

var EventInviteSchema = new mongoose.Schema({
	sent: Date,
	event_id: String,
	user_id: String,
},{strict: false});

module.exports = mongoose.model('EventInvite',EventInviteSchema);
