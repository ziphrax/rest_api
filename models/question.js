var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	name: String,
    owner: String
},{strict: false});

module.exports = mongoose.model('Question',QuestionSchema);
