exports.get = function(req, res, next){	
	res.render('account/login');
}

exports.post = function(req, res, next){	
	res.send('post method');
}