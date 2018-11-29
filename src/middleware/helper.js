import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  },
  validateOrder(order) {

    const schema = {
      pickup: Joi.string().min(3).required(),
      destination: Joi.string().min(3).required(),
      weight: Joi.number().required(),
      receiver_name: Joi.string().min(3).required(),
      receiver_email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      receiver_address: Joi.string().min(3).required()
    };

    return Joi.validate(order, schema, { abortEarly: false });
  },
  validateStatus(order) {

    const schema = {
      status: Joi.string().min(3).required()
    };

    return Joi.validate(order, schema);
  },
  validateLocation(order) {

    const schema = {
      location: Joi.string().min(3).required()
    };

    return Joi.validate(order, schema);
  },
  validateAdmin(order) {

    const schema = {
      location: Joi.string().min(3),
      status: Joi.string().min(3)
    };

    return Joi.validate(order, schema);
  },
  validateUpdate(order) {

    const schema = {
      destination: Joi.string().min(3).required()
    };

    return Joi.validate(order, schema);
  },
  validateUser(user) {

    const schema = {
      fullName: Joi.string().min(3).required(),
      username: Joi.string().min(3).required(),
      password: Joi.string().min(3).required(),
      userType: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required()
    };
    return Joi.validate(user, schema);
  },
  validateLogin(user) {

    const schema = {
      password: Joi.string().min(3).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required()
    };
    return Joi.validate(user, schema);
  }
}

export default Helper;