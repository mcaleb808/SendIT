'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();

var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', function () {
  console.log('connected to the db');
});

var createUser = function createUser() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        username VARCHAR(128) NOT NULL,\n        fullname VARCHAR(128) NOT NULL,\n        usertype VARCHAR(128) NOT NULL,\n        password VARCHAR(128) NOT NULL\n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var createParcel = function createParcel() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      parcels(\n        id serial PRIMARY KEY,\n        pickup TEXT NOT NULL,\n        destination TEXT NOT NULL,\n        location TEXT NOT NULL,\n        weight NUMERIC NOT NULL,\n        receiver_name VARCHAR(128) NOT NULL,\n        receiver_address VARCHAR(128) NOT NULL,\n        receiver_email VARCHAR(128) NOT NULL,\n        status TEXT NOT NULL,\n        sender_id INTEGER NOT NULL,\n        FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE\n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var dropUser = function dropUser() {
  var queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

var dropParcel = function dropParcel() {
  var queryText = 'DROP TABLE IF EXISTS parcels returning *';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUser: createUser,
  createParcel: createParcel,
  dropUser: dropUser,
  dropParcel: dropParcel
};

require('make-runnable');