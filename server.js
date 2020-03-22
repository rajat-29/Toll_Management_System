var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var ejs = require('ejs');
var port = process.env.PORT || 3000;
var http = require('http');
var server = http.Server(app);
var bodyParser = require("body-parser");
var mongoStore = require("connect-mongo")(session);

require("dotenv").config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set('views', path.join(__dirname, 'views'));  // view engine setup
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public')))

// DB //
require("./config/db");

/* Mongoose Connectopn */
var mongoose = require("mongoose");
var db = mongoose.connection;

app.use(express.urlencoded({extended: true}))
app.use(express.json())                 /*include express*/
app.use(session({
    secret: "xYzUCAchitkara",
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
      mongooseConnection: db
    })
}))

app.use('/',require('./Routes/'));

server.listen(port, () => {
	console.log('Running on port ' +port);
});