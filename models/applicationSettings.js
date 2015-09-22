var mongoose = require('mongoose');

var ApplicationSettingsSchema = new mongoose.Schema({
	setupHasRun: Boolean
});

module.exports = mongoose.model('ApplicationSettings',ApplicationSettingsSchema);
