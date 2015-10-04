var mongoose = require('mongoose');

var ApplicationSettingsSchema = new mongoose.Schema({
	setupHasRun: Boolean
},{strict: false});

module.exports = mongoose.model('ApplicationSettings',ApplicationSettingsSchema);
