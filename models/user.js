var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
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
	phone_work: String,
	admin: Boolean,
	password: String
},{strict: false});

module.exports = mongoose.model('User',UserSchema);
