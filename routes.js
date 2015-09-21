var express = require('express'),
    router = new express.Router()
    path = require('path'),
    indexRouter = require('./routes/index'),
    apiRouter = require('./routes/api'),
    errorPagesController = require('./controllers/errorPages');

router.use('/',indexRouter);
router.use('/api/v1',apiRouter);
router.use( errorPagesController.return404 );

module.exports = router;
