exports.get = function(req, res, next){
	//res.send('This is test response for ' + req.params.action);
	res.render('todos/create', {name:"Dude"});
}