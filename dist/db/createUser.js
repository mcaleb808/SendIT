'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryText = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        username VARCHAR(128) NOT NULL,\n        fullname VARCHAR(128) NOT NULL,\n        usertype VARCHAR(128) NOT NULL,\n        password VARCHAR(128) NOT NULL\n      )';
(function () {
  _index2.default.query(queryText).then(function () {}).catch(function (err) {
    console.log(err);
  });
})();