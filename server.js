'use strict';

/* Require hook to setup babel  */
require('babel-core/register');
require('babel-polyfill');

var config = require('config');
var PORT = config.server.port;
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var log = require('./lib/logger');


//Establish database connection
require('./config/mongoose')(mongoose);

//Establish swagger settings
require('./config/swagger')(app);

//Establish app settings
require('./config/app')(app);

var server = app.listen(PORT);

module.exports = app;
