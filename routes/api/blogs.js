var express = require('express'),
    router = new express.Router(),
    blogsController = require('./../../controllers/blogs'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(blogsController.getBlogs)
    .post(blogsController.newBlog);

router.route('/recent')
    .get(blogsController.getRecentBlogs);

router.route('/:id')
    .get(blogsController.getBlog)
    .post(blogsController.updateBlog)
    .delete(blogsController.deleteBlog);

router.route('/:id/comments')
    .get(blogsController.getComments)
    .post(blogsController.newComment);

module.exports = router;
