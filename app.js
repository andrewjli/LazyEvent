var debug = require('debug')('LazyEvent');
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var graph = require('fbgraph');
 
var FACEBOOK_APP_ID = '470267856432810';
var FACEBOOK_APP_SECRET = '60f4d4b4a9aceb3c5ba11d193c3414f6';

var db = require('./models');

var routes = require('./routes');
var users = require('./routes/user');
var success = require('./routes/success');
var dashboard = require('./routes/dashboard');

var app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.cookieParser());
app.use(express.session({ secret: 'secret' }));
app.use(require('stylus').middleware(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'static')));

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use('/static/img/', express.static(__dirname + '/static/img/'));

app.get('/', routes.index);
app.get('/success', success.program);
app.get('/dashboard', dashboard.program);
app.get('/users', users.list);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://lazyevent.herokuapp.com/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  graph.setAccessToken(accessToken);	
  process.nextTick(function() {
    //console.log(accessToken);
    //console.log(profile);
    //Assuming user exists
    db.User.find({ where: { fbuserid: profile.id } })
    .complete(function(err, exists) {
      if (!!err) {
        console.log('An error occurred while searching for John:', err)
      } else if (!exists) {
        db.User.create({
            fbuserid: profile.id,
            fullname: profile.displayName,
            firstname: profile.name.givenName,
            surname: profile.name.familyName,
          }).success(function() {
          done(null, profile);
        });
      } else {
        done(null, profile);
      }
    });
  });
}));


app.get('/auth/facebook', passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/success',
  failureRedirect: '/error'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

db.sequelize.sync({force: true}).complete(function(err) {
  if (err) {
    throw err;
  } else {
    http.createServer(app).listen(app.get('port'), function(){
      debug('Express server listening on port ' + app.get('port'));
    });
  }
});
