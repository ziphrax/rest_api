var mongoose = require('mongoose');

var ParticipantSchema = new mongoose.Schema({
	name: String,
    owner: String
});

module.exports = mongoose.model('Participant',ParticipantSchema);
