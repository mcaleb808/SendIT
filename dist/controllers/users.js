'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _Helper = require('./Helper');

var _Helper2 = _interopRequireDefault(_Helper);

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
    var hashPassword = _Helper2.default.hashPassword(req.body.password);
    var data = 'INSERT INTO\n      users(email, username, fullname, usertype, password)\n      VALUES($1, $2, $3, $4, $5)\n      returning *';
    var values = [req.body.email, req.body.username, req.body.fullName, req.body.userType, hashPassword];

    try {
      var _ref = await _db2.default.query(data, values),
          rows = _ref.rows;

      var token = _Helper2.default.generateToken(rows[0].id);
      return res.status(201).send({ token: token });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ 'message': 'User with that EMAIL already exist' });
      }
      console.log(error.stack);
      return res.status(400).send(error);
    }
  },
  signIn: async function signIn(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ 'message': 'Some values are missing' });
    }
    if (!_Helper2.default.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }
    var text = 'SELECT * FROM users WHERE email = $1';
    try {
      var _ref2 = await _db2.default.query(text, [req.body.email]),
          rows = _ref2.rows;

      if (!rows[0]) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      if (!_Helper2.default.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
      }
      var token = _Helper2.default.generateToken(rows[0].id);
      return res.status(200).send({ token: token });
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