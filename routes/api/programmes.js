var express = require('express'),
    router = new express.Router(),
    programmesController = require('./../../controllers/programmes'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(programmesController.getProgrammes)
    .post(programmesController.newProgramme);

router.route('/:id')
    .get(programmesController.getProgramme)
    .post(programmesController.updateProgramme)
    .delete(programmesController.deleteProgramme);

module.exports = router;
