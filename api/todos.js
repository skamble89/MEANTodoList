var settingsModule = require('../modules/settings');
var settings = settingsModule.getSettings();
var mongoskin = require('mongoskin');
var db = mongoskin.db(settings.connection_string);

exports.get = function(req, res, next){	
	db.collection('todos').find().toArray(function(err, result) {
	  	if (err) throw err;	  	
	  	res.send(result)
	});	
}

exports.post = function(req, res, next){

	db.collection('todos').insert({
		title: req.body.title,
		description: req.body.description,
		completed: false
	}, function(err, result) {
	  	if (err) throw err;	  	
	  	res.send(result)
	});
}

exports.delete = function(req, res, next){	
	db.collection('todos').remove({
		_id: mongoskin.ObjectID.createFromHexString(req.query.id)
	}, function(err, result) {
	  	if (err) throw err;	  	
	  	res.sendStatus(200)
	})
}