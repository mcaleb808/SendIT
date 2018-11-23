// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});
   
const createParcel = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      parcels(
        id SERIAL PRIMARY KEY,
        location VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        pLocation VARCHAR(128) NOT NULL,
        weight INTEGER NOT NULL,
        senderId INTEGER NOT NULL,
        receiver VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL
      )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createUser = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        username VARCHAR(128) UNIQUE NOT NULL,
        fullname VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropParcel = () => {
  const queryText = 'DROP TABLE IF EXISTS parcels returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUser = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUser,
  createParcel,
  dropParcel,
  dropUser,
};

require('make-runnable');
