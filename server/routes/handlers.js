var fs = require('fs'),
    jsonPath = './data.json',
    handlers = {},
    utils = require('./utils');

handlers.index = function ( req, res ) {
    res.send('please check the Bloggy API');
};

handlers.getAll = function ( req, res) {
    fs.readFile(jsonPath, 'utf8', function (err, data) {
        var obj = JSON.parse(data);

        if (err) { throw err; }
        res.json(obj);
    });
};

handlers.create = function ( req, res ) {
    var data, jsonData, newObj;

    req.on('data', function (chunk) {
        data = JSON.parse(chunk.toString()).data;
        //very simple validation
        if (!data || !data.title || !data.content){
            res.status(400).send({ error: 'Something failed!' });
        } else {
            readWriteFile(data);
        }
    });

    function readWriteFile (data) {
        //let's read the json data file
        fs.readFile(jsonPath, 'utf8', function (err, file) {
            if (err) { throw err; }
            jsonData = JSON.parse(file);
            newObj = {
                "id": Date.now(),
                "title": data.title,
                "content": data.content
            };
            jsonData.blog.push(newObj);
            //okey got it! let's write into the "DB" XD
            fs.writeFile(jsonPath, JSON.stringify(jsonData), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.json(newObj).end();
        });
    }
};

handlers.update = function ( req, res ){
    var updateData = false;
    req.on('data', function(chunk) {
        var data = JSON.parse(chunk.toString());

        validateData(data);
    });

    function validateData(data){
        //very simple validation
        if (!data){
            res.status(400).send({ error: 'Something failed!' });
        }
        updateData = data.data;
        //validate a litte betrer
        if (!updateData || !updateData.id || !updateData.title || !updateData.content){
            res.status(400).send({ error: 'Something failed!' });
        }
        //ok let's read the file
        fs.readFile(jsonPath, 'utf8', function (err, readData) {
            var jsonData = JSON.parse(readData);

            if (err) { throw err; }

            //keep it simple remove old first
            removeOldData(updateData.id, jsonData);
        });
    }

    function removeOldData (id, jsonData) {
        if (!id || !jsonData) {
            res.status(400).send({ error: 'Something failed!' });
        }
        utils.findAndRemoveFromJsonArray(jsonData.blog, 'id', id);
        updateJson(jsonData);
    }

    function updateJson(jsonData) {
        if (!jsonData) {
            res.status(400).send({ error: 'Something failed!' });
        }
        //update json
        jsonData.blog.push(updateData);
        writeNewJson(jsonData);
    }

    function writeNewJson(jsonData) {
        if (!jsonData) {
            res.status(400).send({ error: 'Something failed!' });
        }
        //keep it simple  now write new data
        fs.writeFile(jsonPath, JSON.stringify(jsonData), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    res.end();
};

handlers.remove = function ( req, res) {
    var jsonData = {},
        delId = req.params.id;

    fs.readFile(jsonPath, 'utf8', function (err, data) {
        if (err) { throw err; }
        jsonData = JSON.parse(data);
        removeData(delId, jsonData);
    });

    function removeData (id, jsonData) {
        utils.findAndRemoveFromJsonArray(jsonData.blog, 'id', id);
        writeNewJson(jsonData);
    }

    function writeNewJson (jsonData) {
        fs.writeFile(jsonPath, JSON.stringify(jsonData), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }

    res.end();
};

module.exports = handlers;
