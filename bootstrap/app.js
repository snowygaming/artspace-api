
var log = require('./../lib/logger');
var expressWinston = require('express-winston');
var winston = require('winston');
var winstonMongoDB = require('winston-mongodb').MongoDB;

var config = require('config');
var HOST = config.server.hostname;
var PORT = config.server.port;

var mongoConfig = config.mongo;

module.exports = function(app){
    //logging requests and errors ito console and mongodb
    app.use(expressWinston.logger({
        transports: [
            new winston.transports.Console({
                level: 'info',
                json: false,
                colorize: true
            }),
            new winston.transports.MongoDB({
                db: 'mongodb://' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.database,
                collection: 'artSpaceLog',
                level: 'info'
            })
        ],
        exceptionHandlers: [ new winston.transports.Console() ],
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res}}',
        expressFormat: true,
        colorStatus: true
    }));

    //error logging to console and mongodb
    app.use(expressWinston.errorLogger({
        transports: [
            new winston.transports.Console({
                level: 'info',
                json: true,
                colorize: true
            }),
            new winston.transports.MongoDB({
                db: 'mongodb://' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.database,
                collection: 'errorLog',
                level: 'info'
            })
        ],
        exceptionHandlers: [ new winston.transports.Console() ],
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res}}',
        expressFormat: true,
        colorStatus: true
    }));
}
