import Joi from 'joi';
import db from '../db';

const ParcelControllers = {
  async createParcel(req, res) {
        const { error } = validateOrder(req.body);
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
        return res.status(201).send(rows[0]);
        } catch(error) {
        return res.status(400).send(error);
        }
    },
    async getAllParcels(req, res) {
        const findUserParcels = 'SELECT * FROM parcels where sender_id = $1';
        try {
          const { rows, rowCount } = await db.query(findUserParcels, [req.user.id]);
          return res.status(200).send({ rows, rowCount });
        } catch(error) {
          return res.status(400).send(error);
        }
    },
    async getAll(req, res) {
      const findUserParcels = 'SELECT * FROM parcels';
      try {
        const { rows, rowCount } = await db.query(findUserParcels);
        return res.status(200).send({ rows, rowCount });
      } catch(error) {
        return res.status(400).send(error);
      }
  },
    async getParcel(req, res) {
        const text = 'SELECT * FROM parcels WHERE id = $1 AND sender_id = $2';
        try {
          const { rows } = await db.query(text, [req.params.id, req.user.id]);
          if (!rows[0]) {
            return res.status(400).send({'message': 'parcel not found'});
          }
          return res.status(200).send(rows[0]);
        } catch(error) {
          return res.status(400).send(error)
        }
      }, 
      async cancelParcel(req, res) {
        const findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
        const cancel =`UPDATE parcels
          SET status=$1 returning *`;
        try {
          const { rows } = await db.query(findParcel, [req.params.id, req.user.id]);
          if(!rows[0]) {
            return res.status(400).send({'message': 'Parcel not found'});
          }
          const values = [
            'canceled'
          ];
          const response = await db.query(cancel, values);
          return res.status(200).send(response.rows[0]);
        } catch(err) {
          console.log(err.stack);
          return res.status(400).send(err);
        }
      },
      async changeDestination(req, res) {
        const { error } = validateUpdate(req.body);
        if (error) {
        res.status(400).send(error.details[0].message);
    
        return;
        }
        const findParcel = 'SELECT * FROM parcels WHERE id=$1 AND sender_id = $2';
        const destination =`UPDATE parcels
          SET destination=$1 returning *`;
        try {
          const { rows } = await db.query(findParcel, [req.params.id, req.user.id]);
          if(!rows[0]) {
            return res.status(400).send({'message': 'Parcel not found'});
          }
          const values = [
            req.body.destination
          ];
          const response = await db.query(destination, values);
          return res.status(200).send(response.rows[0]);
        } catch(err) {
          return res.status(400).send(err);
        }
      },
      async adminEdit(req, res) {
        const { error } = validateAdmin(req.body);
        if (error) {
        res.status(400).send(error.details[0].message);
    
        return;
        }
        const findParcel = 'SELECT * FROM parcels WHERE id=$1';
        const changes =`UPDATE parcels
          SET location=$1, status = $2 returning *`;
        try {
          const { rows } = await db.query(findParcel, [req.params.id]);
          if(!rows[0]) {
            return res.status(400).send({'message': 'Parcel not found'});
          }
          const values = [
            req.body.location,
            req.body.status
          ];
          const response = await db.query(changes, values);
          return res.status(200).send(response.rows[0]);
        } catch(err) {
          return res.status(400).send(err);
        }
      }

}
const validateOrder = order => {

    const schema = {
      pickup: Joi.string().min(3).required(),
      destination: Joi.string().min(3).required(),
      weight: Joi.number().required(),
      receiver_name: Joi.string().min(3).required(),
      receiver_email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      receiver_address: Joi.string().min(3).required()
    };
  
    return Joi.validate(order, schema);
  };
  const validateAdmin = order => {

    const schema = {
      location: Joi.string().min(3).required(),
      status: Joi.string().min(3).required()
    };
  
    return Joi.validate(order, schema);
  };
  const validateUpdate = order => {

    const schema = {
      destination: Joi.string().min(3).required()
    };
  
    return Joi.validate(order, schema);
  };

export default ParcelControllers;