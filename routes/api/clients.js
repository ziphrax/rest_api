var express = require('express'),
    router = new express.Router(),
    clientsController = require('./../../controllers/clients'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(clientsController.getClients)
    .post(clientsController.newClient);

router.route('/new')
    .get(clientsController.getNewClient);
    
router.route('/:id')
    .get(clientsController.getClient)
    .post(clientsController.updateClient)
    .delete(clientsController.deleteClient);

module.exports = router;
