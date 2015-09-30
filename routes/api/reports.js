var express = require('express'),
    router = new express.Router(),
    reportsController = require('./../../controllers/reports'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(reportsController.getReports)
    .post(reportssController.newReport);

router.route('/:id')
    .get(reportsController.getReport)
    .post(reportsController.updateReport)
    .delete(reportsController.deleteReport);

module.exports = router;
