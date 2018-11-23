'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParcelController = {
  create: async function create(req, res) {
    var createQuery = 'INSERT INTO\n      parcels(location, destination, plocation, weight, senderid, receiver, status)\n      VALUES($1, $2, $3, $4, $5, $6, $7)\n      returning *';
    var values = [req.body.location, req.body.destination, req.body.plocation, req.body.weight, req.body.senderid, req.body.receiver, req.body.status];

    try {
      var _ref = await _db2.default.query(createQuery, values),
          rows = _ref.rows;

      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  getAll: async function getAll(req, res) {
    var findAllQuery = 'SELECT * FROM parcels';
    try {
      var _ref2 = await _db2.default.query(findAllQuery),
          rows = _ref2.rows,
          rowCount = _ref2.rowCount;

      return res.status(200).send({ rows: rows, rowCount: rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  getOne: async function getOne(req, res) {
    var text = 'SELECT * FROM parcels WHERE id = $1';
    try {
      var _ref3 = await _db2.default.query(text, [req.params.id]),
          rows = _ref3.rows;

      if (!rows[0]) {
        return res.status(404).send({ 'message': 'Parcel not found ' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

exports.default = ParcelController;