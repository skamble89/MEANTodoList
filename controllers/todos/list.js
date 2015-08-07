exports.get = function(req, res, next){	
	res.render('todos/list', req.user);
}