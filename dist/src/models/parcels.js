"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Order = function () {
  function Order(id, Pickup, destination, contents, value, weight, location, senderId, sname, semail, rname, remail, raddress, status) {
    _classCallCheck(this, Order);

    this.id = id;
    this.Pickup = Pickup;
    this.destination = destination;
    this.contents = contents;
    this.value = value;
    this.weight = weight;
    this.location = location;
    this.senderId = senderId;
    this.sname = sname;
    this.semail = semail;
    this.rname = rname;
    this.remail = remail;
    this.raddress = raddress;
    this.status = status;
  }

  _createClass(Order, [{
    key: "getParcelId",
    value: function getParcelId() {
      return this.id;
    }
  }, {
    key: "getSenderMail",
    value: function getSenderMail() {
      return this.semail;
    }
  }]);

  return Order;
}();

exports.default = Order;