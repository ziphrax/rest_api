var express = require('express'),
    router = new express.Router()
    authenticationRoute = require('./api/authentication'),
    blogsRoute = require('./api/blogs'),
    clientsRoute = require('./api/clients'),
    eventsRoute = require('./api/events'),
    eventinvitessRoute = require('./api/eventinvites'),
    friendsRoute = require('./api/friends'),
    iterationsRoute = require('./api/iterations'),
    usersRoute = require('./api/users'),
    nomineesRoute = require('./api/nominees'),
    participantsRoute = require('./api/participants'),
    programmesRoute = require('./api/programmes'),
    questionsRoute = require('./api/questions'),
    reportsRoute = require('./api/reports');

router.use('/authentication',authenticationRoute);
router.use('/blogs',blogsRoute);
router.use('/clients',clientsRoute);
router.use('/events',eventsRoute);
router.use('/eventinvites',eventinvitessRoute);
router.use('/friends',friendsRoute);
router.use('/iterations',iterationsRoute);
router.use('/nominees',nomineesRoute);
router.use('/participants',participantsRoute);
router.use('/programmes',programmesRoute);
router.use('/questions',questionsRoute);
router.use('/reports',reportsRoute);
router.use('/users',usersRoute);

module.exports = router;
