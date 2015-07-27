var express = require('express');
var router = express.Router();

router.all('/:controller?/:action?', function (req, res, next) {
	var route = require('../controllers/' + req.params.controller + '/' + req.params.action);	
	route[req.method.toLowerCase()](req, res, next);	
});

module.exports = router;