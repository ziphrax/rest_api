var express = require('express'),
    router = new express.Router()
    indexController = require('../controllers/index');

router.route('/').get(indexController.index);

module.exports = router;
