var express = require('express');
var settings_module = require('./modules/settings');
var settings = settings_module.getSettings();
var app = express();
var db = require('mongoskin').db(settings.connection_string);
var router = require('./modules/router');

app.use('/', router);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Application listening at http://%s:%s', host, port);
});