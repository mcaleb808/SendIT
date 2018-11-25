'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Auth = {
  verifyToken: async function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      var decoded = await _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var text = 'SELECT * FROM users WHERE id = $1';

      var _ref = await _db2.default.query(text, [decoded.userId]),
          rows = _ref.rows;

      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

exports.default = Auth;