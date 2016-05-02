

var log = require('./../lib/logger');
var swaggerTools = require('swagger-tools');
var config = require('config');
var HOST = config.server.hostname;
var PORT = config.server.port;

var swaggerDoc = require('./../swagger.json');
var apiDoc = require('./../lib/swaggerDoc')(swaggerDoc);

module.exports = function(app){

    swaggerTools.initializeMiddleware(apiDoc, function initSwaggerCb(middleware) {
        log.info('Initialized middleware. Starting app.');

        app.use(middleware.swaggerMetadata()); // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        log.debug('Loaded middleware: swaggerMetadata');

        app.use(middleware.swaggerValidator());
        log.debug('Loaded middleware: swaggerValidator');

        app.use(middleware.swaggerRouter({controllers: './api/controllers'}));
        log.debug('Loaded middleware: swaggerRouter');

        app.use(middleware.swaggerUi()); // Swagger documents and Swagger UI
        log.debug('Loaded middleware: swaggerUI');

        log.info('Service started on ' + PORT);
        log.info('API Documentation available at http://' + HOST + ':' + PORT + '/docs');
    });
};
