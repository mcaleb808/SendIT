import db from './index';

const createParcelsTable = `CREATE TABLE IF NOT EXISTS
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
setTimeout(() => {
  db.query(createParcelsTable)
    .then(() => {
    })
    .catch((err) => {
      console.log(err);
    });
}, 50);
