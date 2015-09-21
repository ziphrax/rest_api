var express = require('express'),
    router = new express.Router()
    usersController = require('./../../controllers/users');

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.newUser);

router.route('/:id')
    .get(usersController.getUser)
    .post(usersController.updateUser)
    .delete(usersController.deleteUser);

module.exports = router;
