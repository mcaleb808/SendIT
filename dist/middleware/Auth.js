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
      return res.status(401).send({ 'message': 'Token is not provided' });
    }
    try {
      var decoded = await _jsonwebtoken2.default.verify(token, process.env.SECRET);
      var text = 'SELECT * FROM users WHERE id = $1';

      var _ref = await _db2.default.query(text, [decoded.userId]),
          rows = _ref.rows;

      if (!rows[0]) {
        return res.status(401).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'something went wong please try again'
      });
    }
  },
  checkUser: async function checkUser(req, res, next) {
    try {
      var check = 'SELECT * FROM users WHERE id = $1';

      var _ref2 = await _db2.default.query(check, [req.user.id]),
          rows = _ref2.rows;

      if (rows[0].usertype !== 'admin') {
        return res.status(403).send({ message: 'Forbidden', status: 403 });
      }
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

exports.default = Auth;