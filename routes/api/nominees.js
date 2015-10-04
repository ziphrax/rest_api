var express = require('express'),
    router = new express.Router(),
    nomineesController = require('./../../controllers/nominees'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(nomineesController.getNominees)
    .post(nomineesController.newNominee);

router.route('/:id')
    .get(nomineesController.getNominee)
    .post(nomineesController.updateNominee)
    .delete(nomineesController.deleteNominee);

module.exports = router;
