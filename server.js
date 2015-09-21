var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    routes = require('./routes');

// Start the server
app.set('port', process.env.PORT || 3000);

app.use('/',routes);
app.use('/public',express.static('public_assets'));
app.use('/public/libs',express.static('bower_components'));

app.listen(app.get('port'),function(){
    console.log('App listening on port: ' + app.get('port'));
});
