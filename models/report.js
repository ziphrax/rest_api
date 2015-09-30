var mongoose = require('mongoose');

var ReportSchema = new mongoose.Schema({
	name: String,
    owner: String
});

module.exports = mongoose.model('Report',ReportSchema);
