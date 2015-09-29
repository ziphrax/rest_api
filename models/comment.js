var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    owner: String,
    blog_id: String,
    subject: String,
    content: String
});

module.exports = mongoose.model('Comment',CommentSchema);
