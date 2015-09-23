var express = require('express'),
    router = new express.Router()
    usersRoute = require('./api/users'),
    eventsRoute = require('./api/events'),
    eventinvitessRoute = require('./api/eventinvites'),
    authenticationRoute = require('./api/authentication'),
    friendsRoute = require('./api/friends');

router.use('/authentication',authenticationRoute);
router.use('/users',usersRoute);
router.use('/events',eventsRoute);
router.use('/eventinvites',eventinvitessRoute);
router.use('/friends',friendsRoute);


module.exports = router;
