'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserControllers = {
  signUp: async function signUp(req, res) {
    var result = validateUser(req.body);

    var _validateUser = validateUser(req.body),
        error = _validateUser.error;

    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    var data = 'INSERT INTO\n      users(email, username, fullname, usertype, password)\n      VALUES($1, $2, $3, $4, $5)\n      returning *';
    var values = [req.body.email, req.body.username, req.body.fullName, req.body.userType, req.body.password];

    try {
      var _ref = await _db2.default.query(data, values),
          rows = _ref.rows;

      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

var validateUser = function validateUser(user) {

  var schema = {
    fullName: _joi2.default.string().min(3).required(),
    username: _joi2.default.string().min(3).required(),
    password: _joi2.default.string().min(3).required(),
    userType: _joi2.default.string().min(3).required(),
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
  };
  return _joi2.default.validate(user, schema);
};

exports.default = UserControllers;