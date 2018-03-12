const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  solarDate = require('./api/models/solarModel'), //created model solar here
  users = require('./api/models/userModel'), //created model user here
  morgan = require('morgan'),
  jwt = require('jsonwebtoken'), // used to create, sign, and verify tokens
  bodyParser = require('body-parser');

global.__root = __dirname + '/';
global.__app = app;
global.__port = port;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SolarDB');

app.set('superSecret', 'salina'); // secret name
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

let routesSolar = require('./api/routes/solarRoutes'); //importing route solar
routesSolar(app); //register the route solar

app.use((req, res) => {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('Solar Rest API server started on: ' + port);
