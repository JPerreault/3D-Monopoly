
/**
 * Module dependencies.
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
var fs = require('fs');


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

var forgot = require('password-reset')({
    uri : 'http://localhost:3000/password_reset',
    from : 'password-robot@localhost',
    host : '127.0.0.1', port : 25,
});
app.use(forgot.middleware);

app.post('/forgot', function (req, res) {
	console.log(req.body);
    var email = req.body.email;
    var reset = forgot(email, function (err) {
        if (err) res.send('Error sending message: ' + err)
        else res.send('Check your inbox for a password reset message.')
    });

    reset.on('request', function (req_, res_) {
        req_.session.reset = { email : email, id : reset.id };
        fs.createReadStream(__dirname + 'public/forgot.html').pipe(res_);
    });
});

app.post('/reset', function (req, res) {
    if (!req.session.reset) return res.send('reset token not set');

    var password = req.body.password;
    var confirm = req.body.confirm;
    if (password !== confirm) return res.send('passwords do not match');

    // update the user db here

    forgot.expire(req.session.reset.id);
    delete req.session.reset;
    res.end('password reset');
});





// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes that require user authentication
app.get('/profile', pass.ensureAuthenticated, mainpage.getprofile);
app.post('/add-friend', pass.ensureAuthenticated, serverpost.addfriend);
app.post('/update_profile', pass.ensureAuthenticated, serverpost.updateprofile);
app.get('/get-friends', pass.ensureAuthenticated, mainpage.friendload);
app.get('/hub', pass.ensureAuthenticated, mainpage.hub);



app.get('/play', game.play);
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


