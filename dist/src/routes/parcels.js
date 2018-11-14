'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.orders = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcels = require('../models/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

var orders = exports.orders = [new _parcels2.default(1, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(2, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(3, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(4, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(5, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(6, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(7, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(8, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated')];

router.get('/', function (req, res) {
	res.send(orders);
});

router.post('/', function (req, res) {

	var result = validateOrder(req.body);

	var _validateOrder = validateOrder(req.body),
	    error = _validateOrder.error;

	if (error) {
		res.status(400).send(error.details[0].message);

		return;
	}
	var order = {
		id: orders.length + 1,
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
	orders.push(order);
	res.send(order);
});

router.put('/:id', function (req, res) {
	var order = orders.find(function (c) {
		return c.id === parseInt(req.params.id);
	});
	if (!order) return res.status(404).send('The parcel with given ID was not found');

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
	res.send(order);
});

router.put('/:id/cancel', function (req, res) {
	var order = orders.find(function (c) {
		return c.id === parseInt(req.params.id);
	});
	if (!order) return res.status(404).send('The parcel with given ID was not found');

	var result = validateCancel(req.body);

	var _validateCancel = validateCancel(req.body),
	    error = _validateCancel.error;

	if (error) {
		res.status(400).send(error.details[0].message);

		return;
	}
	order.status = 'canceled';
	res.send(order);
});

router.get('/:id', function (req, res) {
	var order = orders.find(function (c) {
		return c.id === parseInt(req.params.id);
	});
	if (!order) return res.status(404).send('The parcel with given ID was not found');
	res.send(order);
});

router.delete('/:id', function (req, res) {
	var order = orders.find(function (c) {
		return c.id === parseInt(req.params.id);
	});
	if (!order) return res.status(404).send('The parcel with given ID was not found');

	var index = orders.indexOf(order);
	orders.splice(index, 1);
	res.send(order);
});

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

module.exports = router;