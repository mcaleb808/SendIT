'use strict';

var _jasmine = require('jasmine');

var _jasmine2 = _interopRequireDefault(_jasmine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jasmine = new _jasmine2.default();
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.execute();