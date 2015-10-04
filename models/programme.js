var mongoose = require('mongoose');

var ProgrammeSchema = new mongoose.Schema({
	name: String,
    owner: String
},{strict: false});

module.exports = mongoose.model('Programme',ProgrammeSchema);
