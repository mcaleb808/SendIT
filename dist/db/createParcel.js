'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createParcelsTable = 'CREATE TABLE IF NOT EXISTS\n      parcels(\n        id serial PRIMARY KEY,\n        pickup TEXT NOT NULL,\n        destination TEXT NOT NULL,\n        location TEXT NOT NULL,\n        weight NUMERIC NOT NULL,\n        receiver_name VARCHAR(128) NOT NULL,\n        receiver_address VARCHAR(128) NOT NULL,\n        receiver_email VARCHAR(128) NOT NULL,\n        status TEXT NOT NULL,\n        sender_id INTEGER NOT NULL,\n        FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE\n      )';
setTimeout(function () {
  _index2.default.query(createParcelsTable).then(function () {}).catch(function (err) {
    console.log(err);
  });
}, 50);