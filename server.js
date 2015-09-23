var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser  = require('body-parser'),
    routes = require('./routes'),
    email = require('emailjs'),
    config = require('./config');


// Start smtp
var smtpServer = email.server.connect({
    user: config.smtpUser,
    password: config.smtpPassword,
    host: config.smtpHost,
    ssl: config.smtpSSLEnabled
});
var mongoConnection = mongoose.connect(config.database);

// Start the server
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/public',express.static('public_assets'));
app.use('/public/libs',express.static('bower_components'));
app.use('/',routes);

if (!module.parent) {
  app.listen(app.get('port'), function () {
        console.log("Express server listening on port %d in %s mode",
        app.get('port'),
        app.settings.env
      );
    });
}

module.exports = app;
