var http = require('http');
var express = require('express');
var routes = require('./routes');
var app = express();


// routes
app.get(  '/',                routes.index );
app.get(  '/api/getAll',      routes.getAll );
app.post( '/api/create',      routes.create );
app.get(  '/api/destroy/:id', routes.destroy );
app.get(  '/api/edit/:id',    routes.edit );

var server = http.createServer(app);
var port = app.get('port') || 3000;

function start() {
    server.listen(port, function () {
        console.log('Express server listening on port: ' + port);
    });
}

exports.closeServer = function(){
    server.close();
};// this will we use on the specs run.

start(); //automatically start form now.
