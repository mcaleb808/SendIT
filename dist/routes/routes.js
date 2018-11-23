'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcels = require('../controllers/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use((0, _express.json)());
router.use((0, _express.urlencoded)({ extended: false }));

router.post('/api/v1/parcels', _parcels2.default.create);

router.get('/api/v1/parcels', _parcels2.default.getAll);

router.get('/api/v1/parcels/:id', _parcels2.default.getOne);

exports.default = router;