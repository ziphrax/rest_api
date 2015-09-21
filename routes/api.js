var express = require('express'),
    router = new express.Router()
    usersRoute = require('./api/users'),
    eventsRoute = require('./api/events');

router.use('/users',usersRoute);
router.use('/events',eventsRoute);

module.exports = router;
