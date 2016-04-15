var utils = {};

utils.findIndexFromJsonArray = function (array, property, value) {
    array.forEach(function(result, index) {
        if(result[property] == value) {
            return index;
        }
    });
};


utils.findAndRemoveFromJsonArray = function (array, property, value) {
    array.forEach(function(result, index) {
        console.log('result[property',result[property], value);
        if(result[property] == value) {
            //Remove from array
            array.splice(index, 1);
        }
    });
};


module.exports = utils;
