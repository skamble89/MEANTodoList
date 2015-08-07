var settingsModule = require('../modules/settings');
var settings = settingsModule.getSettings();
var db = require('mongoskin').db(settings.connection_string);

exports.get = function(req, res, next){	
	db.collection('todos').find().toArray(function(err, result) {
	  	if (err) throw err;	  	
	  	res.send(result)
	});	
}