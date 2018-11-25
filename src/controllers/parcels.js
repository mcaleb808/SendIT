import Joi from 'joi';
import db from '../db';

const ParcelControllers = {
  async createParcel(req, res) {
        const result = validateOrder(req.body);
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
            console.log(error.stack)
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

export default ParcelControllers;