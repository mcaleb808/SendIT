'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcels = require('../controllers/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use((0, _express.json)());
router.use((0, _express.urlencoded)({ extended: false }));

router.post('/api/v1/parcels', _parcels2.default.createOrder);

router.get('/api/v1/parcels', _parcels2.default.getAllOrders);

router.get('/api/v1/parcels/:id', _parcels2.default.getOneOrder);

router.put('/api/v1/parcels/:id/cancel', _parcels2.default.cancelOrder);

router.put('/api/v1/parcels/:id', _parcels2.default.editOrder);

router.delete('/api/v1/parcels/:id', _parcels2.default.deleteOrder);

//user endpoints

router.post('/api/v1/users', _users2.default.createUser);

router.put('/api/v1/users/:id', _users2.default.editUser);

router.get('/api/v1/users', _users2.default.getAllUsers);

router.get('/api/v1/users/:id', _users2.default.getOneUser);

router.get('/api/v1/users/:senderId/parcels', _users2.default.getUserParcels);

router.delete('/api/v1/users/:id', _users2.default.deleteUser);

exports.default = router;