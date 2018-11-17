'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcels = require('../controllers/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use((0, _express.json)());
router.use((0, _express.urlencoded)({ extended: false }));

router.post('/', _parcels2.default.createOrder);

router.get('/', _parcels2.default.getAllOrders);

router.get('/:id', _parcels2.default.getOneOrder);

router.put('/:id/cancel', _parcels2.default.cancelOrder);

router.put('/:id', _parcels2.default.editOrder);

router.delete('/:id', _parcels2.default.deleteOrder);

module.exports = router;