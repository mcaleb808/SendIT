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