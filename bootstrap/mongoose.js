
var config = require('config');
var log = require('./../lib/logger');

module.exports = function(mongoose){

    (function(){
        log.info('Initializing the database');
        var connection = "mongodb://" + config.mongo.host + ":" + config.mongo.port + "/" + config.mongo.database;
        mongoose.connect(connection);
    })();

    mongoose.connection.on('error', function(err){
        log.error('Database connection error: ' + err);
    });
}
