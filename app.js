var flash = require('connect-flash');
var express = require('express');
var app = express();
var router = require('./modules/router');
var view_engine = require('./modules/underscore_view_engine');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

//Configure middlewares
app.use(expressSession({secret: 'mySecretKey'}));
app.use(express.static('static'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router(passport));
app.use(flash());

passport.serializeUser(function(user, done) {
    done(null, user.name);
}); 
passport.deserializeUser(function(id, done) {  
    done(null, {name:'Saurabh Kambele', age: 26});  
});

passport.use(new LocalStrategy(
  	function(username, password, done) {	
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