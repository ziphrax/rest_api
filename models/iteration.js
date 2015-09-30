var mongoose = require('mongoose');

var IterationSchema = new mongoose.Schema({
	name: String,
    owner: String
});

module.exports = mongoose.model('Iteration',IterationSchema);
