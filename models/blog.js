var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
	owner: String,
    subject: String,
    content: String,
    status: String,
    created: Date,
    updated: Date
});

module.exports = mongoose.model('Blog',BlogSchema);
