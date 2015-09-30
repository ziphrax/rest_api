var mongoose = require('mongoose');

var ProgrammeSchema = new mongoose.Schema({
	name: String,
    owner: String
});

module.exports = mongoose.model('Programme',ProgrammeSchema);
