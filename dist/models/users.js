"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(email, username, fullName, userType, password) {
  _classCallCheck(this, User);

  this.email = email;
  this.username = username;
  this.fullName = fullName;
  this.userType = userType;
  this.password = password;
};

exports.default = User;