var fs = require('fs');
var jsonPath = './spec/data.json';
var routes = {};

routes.index = function ( req, res, next ){
    res.send('Sam\'s blog');
};

routes.getAll = function ( req, res, next ){
    fs.readFile(jsonPath, 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        res.json(obj);
    });
};

routes.create = function ( req, res ){
    var newData, jsonData;

    req.on('data', function(chunk) {
        newData = JSON.parse(chunk.toString()).data;
        //very simple validation
        if (!newData || !newData.title || !newData.content){
            res.status(400).send({ error: 'Something failed!' });
        }
    });
    //let's read the json data file
    fs.readFile(jsonPath, 'utf8', function (err, data) {
        if (err) throw err;
        jsonData = JSON.parse(data);
        jsonData.blog.push({
            "id": Date.now(),
            "title": newData.title,
            "content": newData.content
        });
        //okey got it! let's write into the "DB" XD
        fs.writeFile(jsonPath, JSON.stringify(jsonData), function (err) {
            if (err){
                console.log(err);
            }
        });
        res.end('Created!');
    });
};

routes.update = function ( req, res, next ){
    res.redirect( '/' );
};

routes.remove = function ( req, res, next ){
    res.redirect( '/' );
};

module.exports = function(app) { //routes setup
    app.get(  '/',                routes.index );
    app.get(  '/api/getAll',      routes.getAll );
    app.post( '/api/create',      routes.create );
    app.get(  '/api/remove/:id',  routes.remove );
    app.get(  '/api/update/:id',  routes.update );
    app.get('*', function(req, res) { //Route not found -- Set 404
        res.json({
            'route': 'Sorry this page does not exist.'
        });
    });
};
