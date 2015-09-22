var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
	sent: Date,
    from_user_id: String,
    to_user_id: String,
	accepted: Boolean
});

module.exports = mongoose.model('Friend',FriendSchema);
