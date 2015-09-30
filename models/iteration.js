var mongoose = require('mongoose');

var IterationSchema = new mongoose.Schema({
	name: String,
    owner: String
},{strict: false});

module.exports = mongoose.model('Iteration',IterationSchema);
