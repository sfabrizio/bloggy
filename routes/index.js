var fs = require('fs');
var jsonPath = './test/data.json';

exports.index = function ( req, res, next ){
    res.send("Sam's blog");
};

exports.getAll = function ( req, res, next ){
    fs.readFile(jsonPath, 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        res.json(obj);
    });
};

exports.create = function ( req, res, next ){
    res.redirect( '/' );
};

exports.edit = function ( req, res, next ){
    res.redirect( '/' );
};

exports.destroy = function ( req, res, next ){
    res.redirect( '/' );
};
