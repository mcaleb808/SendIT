'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParcelControllers = {
  createParcel: async function createParcel(req, res) {
    var result = validateOrder(req.body);

    var _validateOrder = validateOrder(req.body),
        error = _validateOrder.error;

    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    var createQuery = 'INSERT INTO\n        parcels(pickup, destination, location, weight, \n            receiver_name, receiver_address,receiver_email, status, sender_id )\n        VALUES($1, $2, $1, $3, $4, $5, $6, $7, $8)\n        returning *';
    var data = [req.body.pickup, req.body.destination, req.body.weight, req.body.receiver_name, req.body.receiver_address, req.body.receiver_email, "generated", req.user.id];

    try {
      var _ref = await _db2.default.query(createQuery, data),
          rows = _ref.rows;

      return res.status(201).send(rows[0]);
    } catch (error) {
      console.log(error.stack);
      return res.status(400).send(error);
    }
  },
  getAllParcels: async function getAllParcels(req, res) {
    var findUserParcels = 'SELECT * FROM parcels where sender_id = $1';
    try {
      var _ref2 = await _db2.default.query(findUserParcels, [req.user.id]),
          rows = _ref2.rows,
          rowCount = _ref2.rowCount;

      return res.status(200).send({ rows: rows, rowCount: rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  getParcel: async function getParcel(req, res) {
    var text = 'SELECT * FROM parcels WHERE id = $1 AND sender_id = $2';
    try {
      var _ref3 = await _db2.default.query(text, [req.params.id, req.user.id]),
          rows = _ref3.rows;

      if (!rows[0]) {
        return res.status(404).send({ 'message': 'parcel not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};
var validateOrder = function validateOrder(order) {

  var schema = {
    pickup: _joi2.default.string().min(3).required(),
    destination: _joi2.default.string().min(3).required(),
    weight: _joi2.default.number().required(),
    receiver_name: _joi2.default.string().min(3).required(),
    receiver_email: _joi2.default.string().email({ minDomainAtoms: 2 }).required(),
    receiver_address: _joi2.default.string().min(3).required()
  };

  return _joi2.default.validate(order, schema);
};

exports.default = ParcelControllers;