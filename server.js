var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var PORT = process.env.port || 3000;

//initializing models
var models = require('./models/models.js');

//initializing routes
var index = require('./routes/index');


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
app.use(express.static(path.join(__dirname, 'public')));

//declaring routes
app.use('/api/v1/', index);


app.listen(PORT, function(){
    console.log("App listening on port " + PORT);
});

module.exports = app;