import Joi from 'joi';
import db from '../db';

const UserControllers = {
  async signUp(req, res) {
    const result = validateUser(req.body);
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    const data = `INSERT INTO
      users(email, username, fullname, usertype, password)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.email,
      req.body.username,
      req.body.fullName,
      req.body.userType,
      req.body.password
    ];

    try {
      const { rows } = await db.query(data, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  }
};

const validateUser = user => {

  const schema = {
    fullName: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    userType: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  };
  return Joi.validate(user, schema);
};

export default UserControllers;