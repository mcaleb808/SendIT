'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _parcels = require('../models/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

var users = [new _users2.default(1, 'Mugisha Caleb Didier', 'Caleb', 'Calebmugisha', 'mcaleb808@gmail.com')];

var orders = [new _parcels2.default(1, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(2, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(3, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(4, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(5, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(6, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(7, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'), new _parcels2.default(8, 'Kigali', 'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated')];

router.get('/', function (req, res) {
	res.send(users);
});

router.post('/', function (req, res) {

	var result = validateUser(req.body);

	var _validateUser = validateUser(req.body),
	    error = _validateUser.error;

	if (error) {
		res.status(400).send(error.details[0].message);

		return;
	}
	var user = {
		id: users.length + 1,
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	};
	users.push(user);
	res.send(user);
});

router.put('/:id', function (req, res) {
	var user = users.find(function (c) {
		return c.id === parseInt(req.params.id);
	});
	if (!user) return res.status(404).send('The user with given ID was not found');

	var result = validateUser(req.body);

	var _validateUser2 = validateUser(req.body),
	    error = _validateUser2.error;

	if (error) {
		res.status(400).send(error.details[0].message);

		return;
	}
	user.name = req.body.name;
	user.username = req.body.username;

	res.send(user);
});

router.get('/:id', function (req, res) {
	var user = users.find(function (c) {
		return c.id === parseInt(req.params.id);
	});
	if (!user) return res.status(404).send('The user with given ID was not found');
	res.send(user);
});

router.delete('/:id', function (req, res) {
	var user = users.find(function (c) {
		return c.id === parseInt(req.params.id);
	});
	if (!user) return res.status(404).send('The user with given ID was not found');

	var index = users.indexOf(user);
	users.splice(index, 1);
	res.send(user);
});

router.get('/:senderId/parcels', function (req, res) {
	var order = orders.find(function (c) {
		return c.senderId === parseInt(req.params.senderId);
	});
	var parcelPerUser = [];
	var results = {};
	if (!order) {
		results = res.status(404).send('The parcels with given sender Id was not found');
	} else {
		orders.forEach(function (item) {
			if (item.senderId === order.senderId) parcelPerUser.push(item);
		});
		results = parcelPerUser;
	}
	return res.send(results);
});
/*router.get('/:senderId/parcels', (req, res) => {
	const order = orders.find(c => c.senderId ===parseInt(req.params.senderId));
	if (!order) return res.status(404).send('The parcels with given sender Id was not found');
	res.send(order);
});*/

var validateUser = function validateUser(user) {

	var schema = {
		name: _joi2.default.string().min(3).required(),
		username: _joi2.default.string().min(3).required(),
		password: _joi2.default.string().min(3).required(),
		email: _joi2.default.string().email({ minDomainAtoms: 2 }).required()
	};

	return _joi2.default.validate(user, schema);
};

module.exports = router;