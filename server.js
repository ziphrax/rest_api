var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser  = require('body-parser'),
    routes = require('./routes'),
    email = require('emailjs'),
    config = require('./config'),
    jwt = require('jsonwebtoken');


// Start smtp
var smtpServer = email.server.connect({
    user: config.smtpUser,
    password: config.smtpPassword,
    host: config.smtpHost,
    ssl: config.smtpSSLEnabled
});
var mongoConnection = mongoose.connect(config.database,function(err){
    if(err){
        console.log(err);
    } else {
        console.log('connected to:' + config.database)
    }
});

// Start the server
app.set('port', process.env.PORT || 3000);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/',routes);
app.use('/public',express.static('public_assets'));
app.use('/public/libs',express.static('bower_components'));

app.listen(app.get('port'),function(){
    console.log('App listening on port: ' + app.get('port'));
});
