var fs = require('fs');
var jsonPath = './data.json';
var handlers = {};
var utils = require('./utils');

handlers.index = function ( req, res, next ){
    res.send('please check the blog API');
};

handlers.getAll = function ( req, res, next ){
    fs.readFile(jsonPath, 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        res.json(obj);
    });
};

handlers.create = function ( req, res ){
    var data, jsonData, newObj;

    req.on('data', function(chunk) {
        data = JSON.parse(chunk.toString()).data;
        //very simple validation
        if (!data || !data.title || !data.content){
            res.status(400).send({ error: 'Something failed!' });
        }
    });
    //let's read the json data file
    fs.readFile(jsonPath, 'utf8', function (err, file) {
        if (err) throw err;
        jsonData = JSON.parse(file);
        newObj = {
            "id": Date.now(),
            "title": data.title,
            "content": data.content
        };
        jsonData.blog.push(newObj);
        //okey got it! let's write into the "DB" XD
        fs.writeFile(jsonPath, JSON.stringify(jsonData), function (err) {
            if (err){
                console.log(err);
            }
        });
        res.json(newObj).end();
    });
};

handlers.update = function ( req, res ){
    var jsonData = {},
        updateId = req.params.id,
        updateData;

    req.on('data', function(chunk) {
        updateData = JSON.parse(chunk.toString()).data;
        //very simple validation
        if (!updateData || !updateData.id || !updateData.title || !updateData.content){
            res.status(400).send({ error: 'Something failed!' });
        }
    });

    fs.readFile(jsonPath, 'utf8', function (err, readData) {
        if (err) throw err;
        jsonData = JSON.parse(readData);
        removeOldData(updateId, jsonData);
    });

    function removeOldData(id, jsonData){
        utils.findAndRemoveFromJsonArray(jsonData.blog, 'id', id);
        updateJson(jsonData);
    }

    function updateJson(jsonData){
        jsonData.blog.push(updateData);
        writeNewJson(jsonData);
    }

    function writeNewJson(jsonData){
        fs.writeFile(jsonPath, JSON.stringify(jsonData), function (err) {
            if (err){
                console.log(err);
            }
        });
    }

    res.end();
};

handlers.remove = function ( req, res, next ){
    var jsonData = {},
        delId = req.params.id;

    fs.readFile(jsonPath, 'utf8', function (err, data) {
        if (err) throw err;
        jsonData = JSON.parse(data);
        removeData(delId, jsonData);
    });

    function removeData(id, jsonData){
        utils.findAndRemoveFromJsonArray(jsonData.blog, 'id', id);
        writeNewJson(jsonData);
    }

    function writeNewJson(jsonData){
        fs.writeFile(jsonPath, JSON.stringify(jsonData), function (err) {
            if (err){
                console.log(err);
            }
        });
    }

    res.end();
};

module.exports = handlers;
