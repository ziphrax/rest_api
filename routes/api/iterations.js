var express = require('express'),
    router = new express.Router(),
    iterationsController = require('./../../controllers/iterations'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(iterationsController.getIterations)
    .post(iterationsController.newIteration);

router.route('/:id')
    .get(iterationsController.getIteration)
    .post(iterationsController.updateIteration)
    .delete(iterationsController.deleteIteration);

module.exports = router;
