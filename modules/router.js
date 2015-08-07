var express = require('express');
var router = express.Router();

module.exports = function(passport){
	router.get('/account/login',function(req, res){
		res.render('account/login',{redirect:req.query.redirect});
	});

	router.post('/account/login', passport.authenticate('local'/*, {
	    successRedirect: '/todos/list',
	    failureRedirect: '/account/login',
	    failureFlash : true 
	}*/),function (req, res, next){
		if(req.isAuthenticated())
			res.redirect(req.query.redirect || '/todos/list')
		else
			res.redirect('/account/login' + (req.query.redirect ? '?redirect='+req.query.redirect : ''));
	});

	router.all('/api/:controller', isAuthenticated, function (req, res, next) {
		var route = require('../api/' + req.params.controller);	
		route[req.method.toLowerCase()](req, res, next);
	});

	router.all('/:controller?/:action?', isAuthenticated, function (req, res, next) {
		var route = require('../controllers/' + req.params.controller + '/' + req.params.action);	
		route[req.method.toLowerCase()](req, res, next);
	});	

	return router;
}

// As with any middleware it is quintessential to call next()
// if the user is authenticated
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	console.log((req.url!=='/account/login'?'?redirect='+req.url:''));
  	res.redirect('/account/login'+(req.url!=='/' ?'?redirect='+req.url:''));
}