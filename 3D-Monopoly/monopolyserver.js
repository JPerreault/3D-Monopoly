/*
Scott Hoffman
The server of the app, basically does some setup for the app for websockets
and then redirects all the routing to the /routes folder. pass.ensureAuthenticated
is a middleware function that ensures an authenticated session exists. If it doesn't
it redirects the user to the login page rather than trigger the route function.
 */

var express = require('express');
var routes = require('./routes');
var mainpage = require('./routes/mainpage');
var game = require('./routes/play');
var serverpost = require('./routes/post');
var index = require('./routes/home');
var http = require('http');
var path = require('path');
var partials = require('express-partials');
var pass = require('./controllers/passport.js');
var passport = require('passport');
var app = module.exports = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon(__dirname + '/public/images/go.ico'));
app.use(partials());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'monopolyman'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'gamefiles')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes that require user authentication
app.get('/profile', pass.ensureAuthenticated, mainpage.getprofile);
app.post('/add-friend', pass.ensureAuthenticated, serverpost.addfriend);
app.post('/add-game', pass.ensureAuthenticated, serverpost.addgame);
app.post('/update_profile', pass.ensureAuthenticated, serverpost.updateprofile);
app.get('/get-friends', pass.ensureAuthenticated, mainpage.friendload);
app.get('/hub', pass.ensureAuthenticated, mainpage.hub);
app.get('/list', pass.ensureAuthenticated, mainpage.list);
app.get('/get-games', pass.ensureAuthenticated, mainpage.gameload);
app.get('/get-all-games', pass.ensureAuthenticated, mainpage.gamelist);
app.get('/addplay-:id', pass.ensureAuthenticated, game.addnplay);
app.get('/play', pass.ensureAuthenticated, game.play);
app.get('/play-:id', pass.ensureAuthenticated, game.load);
app.get('/public_game', pass.ensureAuthenticated, serverpost.addpublicgame);

app.get('/login', mainpage.login);
app.post('/login', serverpost.login);
app.get('/register', mainpage.register);
app.post('/register', serverpost.register);
app.get('/contact', mainpage.contact);
app.post('/contact', serverpost.contact);
app.get('/logout', mainpage.logout);
app.get('/screenshots', mainpage.screenshots);
app.get('/account_recovery', index.accountRecovery);
app.get('/home', index.home);
app.get('/', index.home);
app.use(mainpage.catch404);


server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', game.connected);


