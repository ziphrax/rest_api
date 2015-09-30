var mongoose = require('mongoose');

var NomineeSchema = new mongoose.Schema({
	name: String,
    owner: String
},{strict: false});

module.exports = mongoose.model('Nominee',NomineeSchema);
