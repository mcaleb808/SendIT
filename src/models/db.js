const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});
   
const createUser = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        username VARCHAR(128) NOT NULL,
        fullname VARCHAR(128) NOT NULL,
        usertype VARCHAR(128) NOT NULL,
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

const createParcel = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      parcels(
        id serial PRIMARY KEY,
        pickup TEXT NOT NULL,
        destination TEXT NOT NULL,
        location TEXT NOT NULL,
        weight NUMERIC NOT NULL,
        receiver_name VARCHAR(128) NOT NULL,
        receiver_address VARCHAR(128) NOT NULL,
        receiver_email VARCHAR(128) NOT NULL,
        status TEXT NOT NULL,
        sender_id INTEGER NOT NULL,
        FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE
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
}

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

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createUser,
  createParcel,
  dropUser,
  dropParcel
};

require('make-runnable');