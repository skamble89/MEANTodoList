var flash = require('connect-flash');
var express = require('express');
var settings_module = require('./modules/settings');
var settings = settings_module.getSettings();
var app = express();
var db = require('mongoskin').db(settings.connection_string);
var router = require('./modules/router');
var view_engine = require('./modules/underscore_view_engine');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Configure middlewares
app.use(express.static('static'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);
app.use(passport.initialize());
app.use(flash());
passport.use(new LocalStrategy(
  	function(username, password, done) {
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
	
		if(username === 'root' && password === 'root'){
			return done(null, {
				name: 'Saurabh Kamble', 
				age: 26
			});
		}else{
			return done(null, false)
		}
  	}
));


app.post('/account/login',
  passport.authenticate('local', { successRedirect: '/todos/create',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);




//Configure view engine
app.engine('html', view_engine.renderFile);
app.set('views', './views');
app.set('view engine', 'html');

//Start server
var server = app.listen(8080, function () {
  	var host = server.address().address;
  	var port = server.address().port;

  	console.log('Application listening at http://%s:%s', host, port);
});