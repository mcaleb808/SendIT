'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use((0, _express.json)());
router.use((0, _express.urlencoded)({ extended: false }));

router.post('/', _users2.default.createUser);

router.put('/:id', _users2.default.editUser);

router.get('/', _users2.default.getAllUsers);

router.get('/:id', _users2.default.getOneUser);

router.get('/:senderId/parcels', _users2.default.getUserParcels);

router.delete('/:id', _users2.default.deleteUser);

module.exports = router;