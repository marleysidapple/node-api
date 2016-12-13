var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var PORT = process.env.port || 3000;

//initializing models
var models = require('./models/models.js');

//initializing routes
var auth = require('./routes/auth')(passport);
var tasks = require('./routes/tasks');


//including passport
var initpassport = require('./routes/passport');
initpassport(passport);


//initialize database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mytasks');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  // Here we are creating a unique session identifier
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
//initializing passport and session
app.use(passport.initialize());
app.use(passport.session());

//declaring routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/', tasks);



// catch 404 and forward to error handler.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// If our applicatione encounters an error, we'll display the error and stacktrace accordingly.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});




app.listen(PORT, function(){
    console.log("App listening on port " + PORT);
});

module.exports = app;