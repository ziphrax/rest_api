var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	title : String,
	content: String,
	status: String,
	created: Date,
	updated: Date,
	owner: String,
    longitude : Number,
    lattitude: Number,
    address : String
});

module.exports = mongoose.model('Event',EventSchema);
