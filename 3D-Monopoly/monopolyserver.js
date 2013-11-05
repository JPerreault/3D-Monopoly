
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var mainpage = require('./routes/mainpage');
var serverpost = require('./routes/post');
var user = require('./routes/user');
var index = require('./routes/home');
var http = require('http');
var path = require('path');
var partials = require('express-partials');


var app = module.exports = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// all environments
app.set('port', process.env.PORT || 3000);

app.use(partials());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'gamefiles')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/login/', mainpage.login);
app.post('/login/', serverpost.login);

app.get('/register/', mainpage.register);
app.post('/register/', serverpost.register);

app.post('/play/', serverpost.play);

app.get('/hub/', mainpage.hub);
app.get('/contact/', mainpage.contact);
app.get('/register/', mainpage.register);
app.get('/screenshots/', mainpage.screenshots);
app.get('/home/', index.home);
app.get('/', index.home);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
