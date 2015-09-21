var express = require('express'),
    router = new express.Router()
    eventsController = require('./../../controllers/events');

router.route('/')
    .get(eventsController.getEvents)
    .post(eventsController.newEvent);

router.route('/:id')
    .get(eventsController.getEvent)
    .post(eventsController.updateEvent)
    .delete(eventsController.deleteEvent);

module.exports = router;
