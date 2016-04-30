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
require('./bootstrap/mongoose')(mongoose);

//Establish swagger settings
require('./bootstrap/swagger')(app);

//Establish app settings
require('./bootstrap/app')(app);

var server = app.listen(PORT);

module.exports = app;
