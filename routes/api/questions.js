var express = require('express'),
    router = new express.Router(),
    questionsController = require('./../../controllers/questions'),
    authenticator = require('./../../controllers/authenticator');

router.use(authenticator);

router.route('/')
    .get(questionsController.getQuestions)
    .post(questionsController.newQuestion);

router.route('/:id')
    .get(questionsController.getQuestion)
    .post(questionsController.updateQuestion)
    .delete(questionsController.deleteQuestion);

module.exports = router;
