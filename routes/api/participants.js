var express = require('express'),
    router = new express.Router(),
    participantsController = require('./../../controllers/participants'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(participantsController.getParticipants)
    .post(participantsController.newParticipant);

router.route('/:id')
    .get(participantsController.getParticipant)
    .post(participantsController.updateParticipant)
    .delete(participantsController.deleteParticipant);

module.exports = router;
