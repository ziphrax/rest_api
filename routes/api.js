var express = require('express'),
    router = new express.Router()
    usersRoute = require('./api/users'),
    eventsRoute = require('./api/events'),
    eventinvitessRoute = require('./api/eventinvites'),
    authenticationRoute = require('./api/authentication'),
    friendsRoute = require('./api/friends'),
    blogsRoute = require('./api/blogs');

router.use('/authentication',authenticationRoute);
router.use('/users',usersRoute);
router.use('/events',eventsRoute);
router.use('/eventinvites',eventinvitessRoute);
router.use('/friends',friendsRoute);
router.use('/blogs',blogsRoute);

module.exports = router;
