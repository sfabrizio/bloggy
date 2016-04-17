var http = require('http');
var express = require('express');
var routes = require('./routes');
var app = express();

app.use(express.static('public'));
app.use('/', express.static('public'));

// Set up Routes for the application
require('./routes/index.js')(app);

app.set('port', (process.env.PORT || 3000));

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log("Server started; listening on port " + app.get('port'));
});

exports.closeServer = function(){
    server.close();
};// this will we use on the specs run.
