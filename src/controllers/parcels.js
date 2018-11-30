import Helper from '../middleware/helper';
import db from '../db';

const ParcelControllers = {
  async createParcel(req, res) {
    const { error } = Helper.validateOrder(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    const createQuery = `INSERT INTO
        parcels(pickup, destination, location, weight, 
            receiver_name, receiver_address,receiver_email, status, sender_id )
        VALUES($1, $2, $1, $3, $4, $5, $6, $7, $8)
        returning *`;
    const data = [
      req.body.pickup,
      req.body.destination,
      req.body.weight,
      req.body.receiver_name,
      req.body.receiver_address,
      req.body.receiver_email,
      "generated",
      req.user.id
    ];
    try {
      const { rows } = await db.query(createQuery, data);
      return res.status(201).send({ message: 'parcel created', Parcels: rows[0] });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getAllParcels(req, res) {
    const findUserParcels = 'SELECT * FROM parcels where sender_id = $1';
    try {
      const { rows, rowCount } = await db.query(findUserParcels, [req.user.id]);
      return res.status(200).send({ Parcels: rows, rowCount });
    } catch (error) {
      return res.status(400).send({ error, message: 'bad request' });
    }
  },
  async getAll(req, res) {
    const findUserParcels = 'SELECT * FROM parcels';
    try {
      const { rows, rowCount } = await db.query(findUserParcels);
      return res.status(200).send({ Parcels: rows, rowCount });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getParcel(req, res) {
    const text = 'SELECT * FROM parcels WHERE id = $1 AND sender_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'parcel not found' });
      }
      return res.status(200).send({ Parcels: rows[0] });
    } catch (error) {
      return res.status(400).send(error)
    }
  },
  async cancelParcel(req, res) {
    const findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
    const cancel = `UPDATE parcels
          SET status=$1  where id =$2 returning *`;
    try {
      const { rows } = await db.query(findParcel, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'Parcel not found' });
      }
      if (rows[0].status == 'delivered' || rows[0].status == 'in-transit' || rows[0].status == 'canceled') {
        return res.status(400).send({ 'message': 'the status of this parcel can not be changed' });
      }
      const values = [
        'canceled',
        req.params.id

      ];
      const response = await db.query(cancel, values);
      return res.status(200).send({ message: 'parcel canceled', Parcels: response.rows[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async changeDestination(req, res) {
    const { error } = Helper.validateUpdate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    const findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
    const destination = `UPDATE parcels
          SET destination=$1 where id= $2 returning *`;
    try {
      const { rows } = await db.query(findParcel, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'Parcel not found' });
      }
      if (rows[0].status == 'delivered' || rows[0].status == 'in-transit' || rows[0].status == 'canceled') {
        return res.status(400).send({ 'message': 'Destination of this parcel can not be changed' });
      }
      const values = [
        req.body.destination,
        req.params.id
      ];
      const response = await db.query(destination, values);
      return res.status(200).send({ message: 'destination changed', Parcels: response.rows[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async changeStatus(req, res) {
    const { error } = Helper.validateStatus(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    const findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
    const status = `UPDATE parcels
          SET status=$1 where id= $2 returning *`;
    try {
      const { rows } = await db.query(findParcel, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'Parcel not found' });
      }
      if (rows[0].status == 'delivered' || rows[0].status == 'in-transit' || rows[0].status == 'canceled') {
        return res.status(400).send({ 'message': 'Destination of this parcel can not be changed' });
      }
      const values = [
        req.body.status,
        req.params.id
      ];
      const response = await db.query(status, values);
      return res.status(200).send({ message: 'Present of location changed', Parcel: response.rows[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  async changeLocation(req, res) {
    const { error } = Helper.validateLocation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    const findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
    const location = `UPDATE parcels
          SET location=$1 where id= $2 returning *`;
    try {
      const { rows } = await db.query(findParcel, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ 'message': 'Parcel not found' });
      }
      if (rows[0].status == 'delivered' || rows[0].status == 'in-transit' || rows[0].status == 'canceled') {
        return res.status(400).send({ 'message': 'Destination of this parcel can not be changed' });
      }
      const values = [
        req.body.location,
        req.params.id
      ];
      const response = await db.query(location, values);
      return res.status(200).send({ message: 'parcel status changed', Parcels: response.rows[0] });
    } catch (err) {
      return res.status(400).send(err);
    }
  }


}

export default ParcelControllers;