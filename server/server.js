var http = require('http'),
    express = require('express'),
    path = require('path'),
    app = express(),
    server;

app.use(express.static( path.join(__dirname , '/../client/dist') ));

// Set up Routes for the application
require('./routes/index.js')(app);

app.set('port', (process.env.PORT || 3000));

server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log( 'Server started listening on port ', app.get('port') );
});

// this will we use on the specs run.
exports.closeServer = function() {
    server.close();
};
