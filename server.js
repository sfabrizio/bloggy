var http = require('http');
var express = require('express');
var routes = require('./routes');
var app = express();

app.use(express.static('public'));
app.use('/', express.static('public'));

// Set up Routes for the application
require('./routes/index.js')(app);

var config = {
    port: 3000
};
var server = http.createServer(app);

server.listen(config.port, function () {
    console.log("Server started; listening on port " + config.port);
});

exports.closeServer = function(){
    server.close();
};// this will we use on the specs run.
