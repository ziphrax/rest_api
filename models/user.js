var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstName: String,
    lastName: String,
    EmailAddress: String,
    DateOfBirth: Date,
	status: String,
	created: Date,
	updated: Date,
	owner: String,
    address : String,
    phone_tel: String,
    phone_mob: String,
    phone_work: String
});

module.exports = mongoose.model('User',UserSchema);
