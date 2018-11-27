import db from './index';

const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        username VARCHAR(128) NOT NULL,
        fullname VARCHAR(128) NOT NULL,
        usertype VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL
      )`;
(() => {
  db.query(queryText)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
})();
