
'use strict';
var config = require('config');
var PORT = config.server.port;
var HOSTNAME = config.server.hostname;

function SwaggerDoc(doc){
  doc.host = HOSTNAME + ':' + PORT;
  return doc;
}

module.exports = SwaggerDoc;
