'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcels = require('./routes/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/', function (req, res) {
  res.sendfile('src/index.html');
});

app.use("/api/v1/parcels", _parcels2.default);
app.use("/api/v1/users", _users2.default);

app.use(function (req, res, next) {
  var error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;