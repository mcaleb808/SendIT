'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {
  hashPassword: function hashPassword(password) {
    return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcrypt2.default.compareSync(password, hashPassword);
  },
  isValidEmail: function isValidEmail(email) {
    return (/\S+@\S+\.\S+/.test(email)
    );
  },
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken2.default.sign({
      userId: id
    }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
  validateOrder: function validateOrder(order) {

    var schema = {
      pickup: _joi2.default.string().min(3).required(),
      destination: _joi2.default.string().min(3).required(),
      weight: _joi2.default.number().required(),
      receiver_name: _joi2.default.string().min(3).required(),
      receiver_email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
      receiver_address: _joi2.default.string().min(3).required()
    };

    return _joi2.default.validate(order, schema);
  },
  validateAdmin: function validateAdmin(order) {

    var schema = {
      location: _joi2.default.string().min(3).required(),
      status: _joi2.default.string().min(3).required()
    };

    return _joi2.default.validate(order, schema);
  },
  validateUpdate: function validateUpdate(order) {

    var schema = {
      destination: _joi2.default.string().min(3).required()
    };

    return _joi2.default.validate(order, schema);
  },
  validateUser: function validateUser(user) {

    var schema = {
      fullName: _joi2.default.string().min(3).required(),
      username: _joi2.default.string().min(3).required(),
      password: _joi2.default.string().min(3).required(),
      userType: _joi2.default.string().min(3).required(),
      email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
    };
    return _joi2.default.validate(user, schema);
  },
  validateLogin: function validateLogin(user) {

    var schema = {
      password: _joi2.default.string().min(3).required(),
      email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
    };
    return _joi2.default.validate(user, schema);
  }
};

exports.default = Helper;