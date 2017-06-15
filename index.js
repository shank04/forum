var express= require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var async = require('async');
var expressValidator = require('express-validator');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var path = require('path');

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(expressValidator()); 
app.use(cookieParser());
app.use(session({ secret: 'SessionID' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/new15_db');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));

var index = require('./routes/index');
app.use('/', index);

app.listen(process.env.PORT || 3000);

