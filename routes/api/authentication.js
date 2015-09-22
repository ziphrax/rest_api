var express = require('express'),
    router = new express.Router()
    authenticationController = require('./../../controllers/authentication');

router.route('/')
    .post(authenticationController.authenticate);

module.exports = router;
