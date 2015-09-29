var blogModel = require('./../models/blog');
var commentModel = require('./../models/comment');

module.exports = {
    getBlogs: function(req,res){
        blogModel.find({}).sort('-date').exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    getRecentBlogs: function(req,res){
        blogModel.find({}).sort('-date').limit(5).exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newBlog: function(req,res){
        var newBlog = new blogModel();

        newBlog.subject = req.body.title;
        newBlog.content = req.body.content;
        newBlog.status = req.body.status;
    	newBlog.created =  Date.now();
        newBlog.owner = req.decoded._id; //the users id

        newBlog.save(function(){
            res.json({'success': true, data: [newBlog] });
        });
    },
    getBlog: function(req,res){
        blogModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                res.json({ 'success':true,'data':[doc] });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    updateBlog: function(req,res){
        blogModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id) {
                    doc.subject = req.body.subject?req.body.subject:doc.subject;
                    doc.content = req.body.content?req.body.content:doc.content;
                    doc.status = req.body.status?req.body.status:doc.status;
                    doc.updated =  Date.now();

                    doc.save(function(){
                        res.json({'success': true, data: [doc] });
                    });
                } else {
                    res.status(401).json({ success: false, message: 'Authentication failed.' });
                }
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    deleteBlog: function(req,res){
        blogModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if (doc) {
                if(doc.owner == req.decoded._id) {
                    doc.remove(function(err){
                        res.status(200).json({'success': true, 'message': 'Blog Deleted' });
                    });
                } else {
                    res.status(401).json({ success: false, message: 'Authentication failed.' });
                }
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    },
    getComments: function(req,res){
        commentModel.find({blog_id:req.params.id}).exec(function(err,docs){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else {
                res.status(200).json({'success':true, data: docs });
            }
        });
    },
    newComment: function(req,res){
        var blog = blogModel.findOne({_id:req.params.id}).exec(function(err,doc){
            if(err){
                res.status(500).json({'success': false, 'message': err.message });
            } else if(doc){
                var comment = new commentModel();
                comment.subject = req.body.subject;
                comment.content = req.body.content;
                comment.status = 'new';
                comment.created = Date.now();
                comment.owner = req.decoded._id;
                comment.save(function(){
                    res.json({'success': true, data: [comment] });
                });
            } else {
                res.status(404).json({'success': false, 'message': 'The requested resource does not exist' });
            }
        });
    }
}
