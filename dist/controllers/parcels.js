'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helper = require('../middleware/helper');

var _helper2 = _interopRequireDefault(_helper);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParcelControllers = {
  createParcel: async function createParcel(req, res) {
    var _Helper$validateOrder = _helper2.default.validateOrder(req.body),
        error = _Helper$validateOrder.error;

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
  getAll: async function getAll(req, res) {
    var findUserParcels = 'SELECT * FROM parcels';
    try {
      var _ref3 = await _db2.default.query(findUserParcels),
          rows = _ref3.rows,
          rowCount = _ref3.rowCount;

      return res.status(200).send({ rows: rows, rowCount: rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  getParcel: async function getParcel(req, res) {
    var text = 'SELECT * FROM parcels WHERE id = $1 AND sender_id = $2';
    try {
      var _ref4 = await _db2.default.query(text, [req.params.id, req.user.id]),
          rows = _ref4.rows;

      if (!rows[0]) {
        return res.status(400).send({ 'message': 'parcel not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  cancelParcel: async function cancelParcel(req, res) {
    var findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
    var cancel = 'UPDATE parcels\n          SET status=$1 returning *';
    try {
      var _ref5 = await _db2.default.query(findParcel, [req.params.id, req.user.id]),
          rows = _ref5.rows;

      if (!rows[0]) {
        return res.status(400).send({ 'message': 'Parcel not found' });
      }
      if (rows[0].status == 'delivered' || rows[0].status == 'in-transit' || rows[0].status == 'canceled') {
        return res.status(400).send({ 'message': 'the status of this parcel can not be changed' });
      }
      var values = ['canceled'];
      var response = await _db2.default.query(cancel, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      console.log(err.stack);
      return res.status(400).send(err);
    }
  },
  changeDestination: async function changeDestination(req, res) {
    var _Helper$validateUpdat = _helper2.default.validateUpdate(req.body),
        error = _Helper$validateUpdat.error;

    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    var findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
    var destination = 'UPDATE parcels\n          SET destination=$1 returning *';
    try {
      var _ref6 = await _db2.default.query(findParcel, [req.params.id, req.user.id]),
          rows = _ref6.rows;

      if (!rows[0]) {
        return res.status(400).send({ 'message': 'Parcel not found' });
      }
      if (rows[0].status == 'delivered' || rows[0].status == 'in-transit' || rows[0].status == 'canceled') {
        return res.status(400).send({ 'message': 'Destination of this parcel can not be changed' });
      }
      var values = [req.body.destination];
      var response = await _db2.default.query(destination, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  adminEdit: async function adminEdit(req, res) {
    var _Helper$validateAdmin = _helper2.default.validateAdmin(req.body),
        error = _Helper$validateAdmin.error;

    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    var findParcel = 'SELECT * FROM parcels WHERE id=$1';
    var changes = 'UPDATE parcels\n          SET location=$1, status = $2 returning *';
    try {
      var _ref7 = await _db2.default.query(findParcel, [req.params.id]),
          rows = _ref7.rows;

      if (!rows[0]) {
        return res.status(400).send({ 'message': 'Parcel not found' });
      }
      var values = [req.body.location, req.body.status];
      var response = await _db2.default.query(changes, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};

exports.default = ParcelControllers;