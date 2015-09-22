var express = require('express'),
    router = new express.Router()
    eventinvitesController = require('./../../controllers/eventinvites'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/send').post(eventinvitesController.sendInvite);

module.exports = router;
