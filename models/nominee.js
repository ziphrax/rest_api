var mongoose = require('mongoose');

var NomineeSchema = new mongoose.Schema({
	name: String,
    owner: String
});

module.exports = mongoose.model('Nominee',NomineeSchema);
