var handlers = require('./handlers');

module.exports = function(app) { //routes setup
    app.get(    '/',                handlers.index );
    app.get(    '/api/getAll',      handlers.getAll );
    app.post(   '/api/create',      handlers.create );
    app.delete( '/api/remove/:id',  handlers.remove );
    app.put(    '/api/update/:id',  handlers.update );
};
