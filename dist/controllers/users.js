'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _users = require('../data/users');

var _users2 = _interopRequireDefault(_users);

var _parcels = require('../data/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserControllers = function () {
  function UserControllers() {
    _classCallCheck(this, UserControllers);
  }

  _createClass(UserControllers, null, [{
    key: 'createUser',
    value: function createUser(req, res) {

      var result = validateUser(req.body);

      var _validateUser = validateUser(req.body),
          error = _validateUser.error;

      if (error) {
        res.status(400).send(error.details[0].message);

        return;
      }
      var user = {
        id: _users2.default.length + 1,
        names: req.body.names,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };
      _users2.default.push(user);
      res.send(user);
    }
  }, {
    key: 'editUser',
    value: function editUser(req, res) {
      var id = req.params.id;

      var user = _users2.default.find(function (c) {
        return c.id === parseInt(req.params.id);
      });
      if (!user) return res.status(404).send('The user with given ID was not found');

      var result = validateUpdate(req.body);

      var _validateUpdate = validateUpdate(req.body),
          error = _validateUpdate.error;

      if (error) {
        res.status(400).send(error.details[0].message);

        return;
      }
      user.names = req.body.names;
      user.email = req.body.email;

      res.status(200).json(user);
    }
  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      res.status(200).json(_users2.default);
    }
  }, {
    key: 'getOneUser',
    value: function getOneUser(req, res) {
      var id = req.params.id;

      var user = _users2.default.find(function (oneUser) {
        return oneUser.id == id;
      });
      if (user) {
        return res.status(200).json({
          oneUser: user
        });
      } else {
        res.status(400).json({
          error: "no user found with that id"
        });
      }
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(req, res) {
      var id = req.params.id;

      var user = _users2.default.find(function (c) {
        return c.id === parseInt(req.params.id);
      });
      if (!user) return res.status(400).send('The user with given ID was not found');

      var index = _users2.default.indexOf(user);
      _users2.default.splice(index, 1);
      res.send(user);
    }
  }, {
    key: 'getUserParcels',
    value: function getUserParcels(req, res) {
      var id = req.params.id;

      var order = _parcels2.default.find(function (c) {
        return c.senderId === parseInt(req.params.senderId);
      });
      var parcelPerUser = [];
      var results = {};
      if (!order) {
        results = res.status(400).send('The parcels with given sender Id was not found');
      } else {
        _parcels2.default.forEach(function (item) {
          if (item.senderId === order.senderId) parcelPerUser.push(item);
        });
        results = parcelPerUser;
        res.send(results);
      }
    }
  }]);

  return UserControllers;
}();

var validateUser = function validateUser(user) {

  var schema = {
    names: _joi2.default.string().min(3).required(),
    username: _joi2.default.string().min(3).required(),
    password: _joi2.default.string().min(3).required(),
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
  };

  return _joi2.default.validate(user, schema);
};

var validateUpdate = function validateUpdate(user) {

  var schema = {
    names: _joi2.default.string().min(3).required(),
    email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
  };

  return _joi2.default.validate(user, schema);
};

exports.default = UserControllers;