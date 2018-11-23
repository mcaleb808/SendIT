'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Reflection = {
  /**
   * Create A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object 
   */
  create: async function create(req, res) {
    var text = 'INSERT INTO\n      reflections(id, success, low_point, take_away, created_date, modified_date)\n      VALUES($1, $2, $3, $4, $5, $6)\n      returning *';
    var values = [(0, _v2.default)(), req.body.success, req.body.low_point, req.body.take_away, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];

    try {
      var _ref = await _db2.default.query(text, values),
          rows = _ref.rows;

      return res.status(201).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get All Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} reflections array
   */
  getAll: async function getAll(req, res) {
    var findAllQuery = 'SELECT * FROM reflections';
    try {
      var _ref2 = await _db2.default.query(findAllQuery),
          rows = _ref2.rows,
          rowCount = _ref2.rowCount;

      return res.status(200).send({ rows: rows, rowCount: rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Get A Reflection
   * @param {object} req 
   * @param {object} res
   * @returns {object} reflection object
   */
  getOne: async function getOne(req, res) {
    var text = 'SELECT * FROM reflections WHERE id = $1';
    try {
      var _ref3 = await _db2.default.query(text, [req.params.id]),
          rows = _ref3.rows;

      if (!rows[0]) {
        return res.status(404).send({ 'message': 'reflection not found' });
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  /**
   * Update A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated reflection
   */
  update: async function update(req, res) {
    var findOneQuery = 'SELECT * FROM reflections WHERE id=$1';
    var updateOneQuery = 'UPDATE reflections\n      SET success=$1,low_point=$2,take_away=$3,modified_date=$4\n      WHERE id=$5 returning *';
    try {
      var _ref4 = await _db2.default.query(findOneQuery, [req.params.id]),
          rows = _ref4.rows;

      if (!rows[0]) {
        return res.status(404).send({ 'message': 'reflection not found' });
      }
      var values = [req.body.success || rows[0].success, req.body.low_point || rows[0].low_point, req.body.take_away || rows[0].take_away, (0, _moment2.default)(new Date()), req.params.id];
      var response = await _db2.default.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  /**
   * Delete A Reflection
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  delete: async function _delete(req, res) {
    var deleteQuery = 'DELETE FROM reflections WHERE id=$1 returning *';
    try {
      var _ref5 = await _db2.default.query(deleteQuery, [req.params.id]),
          rows = _ref5.rows;

      if (!rows[0]) {
        return res.status(404).send({ 'message': 'reflection not found' });
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}; // src/usingDB/controllers/Reflection.js
exports.default = Reflection;