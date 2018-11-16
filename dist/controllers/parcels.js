'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _parcels = require('../data/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParcelControllers = function () {
  function ParcelControllers() {
    _classCallCheck(this, ParcelControllers);
  }

  _createClass(ParcelControllers, null, [{
    key: 'createOrder',
    value: function createOrder(req, res) {
      var result = validateOrder(req.body);

      var _validateOrder = validateOrder(req.body),
          error = _validateOrder.error;

      if (error) {
        res.status(400).send(error.details[0].message);

        return;
      }
      var order = {
        id: _parcels2.default.length + 1,
        Pickup: req.body.Pickup,
        destination: req.body.destination,
        contents: req.body.contents,
        value: req.body.value,
        weight: req.body.weight,
        sname: req.body.sname,
        senderId: req.body.senderId,
        semail: req.body.semail,
        rname: req.body.rname,
        location: req.body.location,
        raddress: req.body.raddress,
        status: req.body.status
      };
      _parcels2.default.push(order);
      res.send(order);
    }
  }, {
    key: 'editOrder',
    value: function editOrder(req, res) {
      var id = req.params.id;

      var order = _parcels2.default.find(function (a) {
        return a.id === parseInt(id);
      });
      if (!order) return res.status(404).json({ message: 'The parcel with given ID was not found' });
      var result = validateOrder(req.body);

      var _validateOrder2 = validateOrder(req.body),
          error = _validateOrder2.error;

      if (error) {
        res.status(400).send(error.details[0].message);

        return;
      }
      order.Pickup = req.body.Pickup;
      order.destination = req.body.destination;
      order.contents = req.body.contents;
      order.value = req.body.value;
      order.weight = req.body.weight;
      order.sname = req.body.sname;
      order.senderId = req.body.senderId;
      order.semail = req.body.semail;
      order.remail = req.body.remail;
      order.rname = req.body.rname;
      order.raddress = req.body.raddress;
      order.status = req.body.status;
      res.status(200).json(order);
    }
  }, {
    key: 'getAllOrders',
    value: function getAllOrders(req, res) {
      res.status(200).json(_parcels2.default);
    }
  }, {
    key: 'getOneOrder',
    value: function getOneOrder(req, res) {
      var id = req.params.id;

      var order = _parcels2.default.find(function (a) {
        return a.id === parseInt(id);
      });
      if (!order) return res.status(404).json({ message: 'The parcel with given ID was not found' });
      res.status(200).json(order);
    }
  }, {
    key: 'deleteOrder',
    value: function deleteOrder(req, res) {
      var id = req.params.id;

      var order = _parcels2.default.find(function (a) {
        return a.id === parseInt(id);
      });
      if (!order) return res.status(404).json({ message: 'The parcel with given ID was not found' });
      var index = _parcels2.default.indexOf(order);
      _parcels2.default.splice(index, 1);
      res.send(order);
    }
  }, {
    key: 'cancelOrder',
    value: function cancelOrder(req, res) {
      var id = req.params.id;

      var order = _parcels2.default.find(function (a) {
        return a.id === parseInt(id);
      });
      if (!order) return res.status(404).json({ message: 'The parcel with given ID was not found' });

      var result = validateCancel(req.body);

      var _validateCancel = validateCancel(req.body),
          error = _validateCancel.error;

      if (error) {
        res.status(400).send(error.details[0].message);

        return;
      }
      order.status = 'canceled';
      res.status(200).json(order);
    }
  }]);

  return ParcelControllers;
}();

var validateOrder = function validateOrder(order) {

  var schema = {
    Pickup: _joi2.default.string().min(3).required(),
    destination: _joi2.default.string().min(3).required(),
    contents: _joi2.default.string().min(3).required(),
    value: _joi2.default.number().required(),
    weight: _joi2.default.number().required(),
    location: _joi2.default.string().min(3).required(),
    sname: _joi2.default.string().min(3).required(),
    semail: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    senderId: _joi2.default.number().required(),
    rname: _joi2.default.string().min(3).required(),
    remail: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    raddress: _joi2.default.string().min(3).required(),
    status: _joi2.default.string().min(3)
  };

  return _joi2.default.validate(order, schema);
};
var validateCancel = function validateCancel(order) {

  var schema = {
    status: _joi2.default.string().min(3)
  };

  return _joi2.default.validate(order, schema);
};

exports.default = ParcelControllers;