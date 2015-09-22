var express = require('express'),
    router = new express.Router()
    usersRoute = require('./api/users'),
    eventsRoute = require('./api/events'),
    eventinvitessRoute = require('./api/eventinvites'),
    authenticationRoute = require('./api/authentication'),

router.use('/authentication',authenticationRoute);
router.use('/users',usersRoute);
router.use('/events',eventsRoute);
router.use('/eventinvites',eventinvitessRoute);


module.exports = router;
