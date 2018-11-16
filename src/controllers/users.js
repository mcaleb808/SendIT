import Joi from 'joi';
import users from '../data/users';
import parcels from '../data/parcels';


class UserControllers {
  static createUser(req, res) {

  const result = validateUser(req.body);
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);

    return;
  }
  const user = {
    id: users.length + 1,
    names: req.body.names,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };
  users.push(user);
  res.send(user);
}


  static editUser(req, res) {
  const { id } = req.params;
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with given ID was not found');

  const result = validateUpdate(req.body);
  const { error } = validateUpdate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);

    return;
  }
  user.names = req.body.names;
  user.email = req.body.email;

  res.status(200).json(user); 
}

  static getAllUsers(req, res) {
    res.status(200).json(users);
  }

  static getOneUser(req, res) {
    const { id } = req.params;
    const user = users.find(oneUser => oneUser.id == id);
    if (user) {
      return res.status(200).json({
        oneUser: user
      });
    } else {
      res.status(404).json({
        error: "no user found with that id"
      });
    }
  }

  static deleteUser(req, res) {
    const { id } = req.params;
    const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with given ID was not found');

  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
}


  static getUserParcels(req, res) {
      const { id } = req.params;
    const order = parcels.find(c => c.senderId === parseInt(req.params.senderId));
    const parcelPerUser = [];
    let results = {};
    if (!order) {
      results = res.status(404).send('The parcels with given sender Id was not found');
    } else {
      parcels.forEach(item => {
        if (item.senderId === order.senderId) parcelPerUser.push(item);
      });
      results = parcelPerUser;
      res.send(results);
    }
    
  }
}

const validateUser = user => {

  const schema = {
    names: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  };

  return Joi.validate(user, schema);
};

const validateUpdate = user => {

  const schema = {
    names: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  };

  return Joi.validate(user, schema);
};


export default UserControllers;
