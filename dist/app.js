'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


app.use(_express2.default.json());
app.use((0, _cors2.default)());

app.get('/', function (req, res) {
  res.sendfile('src/index.html');
});

app.use(_routes2.default);

module.exports = app;