
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , authom = require('authom')
  , authSetup = require('./models/authSetup')
//  , userModel = require('./models/user.model')
  , closure = require('nclosure').nclosure({
    additionalDeps:['deps.js']
  });

goog.provide('ssn.core');
goog.require('ssn.user');
goog.require('ssn.mock.user');

var app = express();

app.configure(function appConfigure(){
  app.set('port', process.env.PORT || 9000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());

  app.use('/assets', express.static(path.join(__dirname, '/../assets')));
  app.use(app.router);

});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/auth/facebook/check', routes.auth);

app.get("/auth/:service", authom.app);
app.get("/auth/:service/" + authom.verifyAuthPath, authom.app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

console.log(ssn.mock.user);
