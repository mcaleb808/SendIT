import Joi from 'joi';
import parcels from '../data/parcels';

class ParcelControllers {
  static createOrder(req, res) {
  const result = validateOrder(req.body);
  const { error } = validateOrder(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);

    return;
  }
  const order = {
    id: parcels.length + 1,
    Pickup: req.body.Pickup,
    destination: req.body.destination,
    contents: req.body.contents,
    value: req.body.value,
    weight: req.body.weight,
    sname: req.body.sname,
    senderId: req.body.senderId,
    semail: req.body.semail,
    rname: req.body.rname,
    location: req.body.location,
    raddress: req.body.raddress,
    status: req.body.status
  };
  parcels.push(order);
  res.send(order);
}
  static editOrder(req, res) {
    const { id } = req.params;
    const order = parcels.find(a => a.id === parseInt(id));
    if (!order) return res.status(400).json({ message: 'The parcel with given ID was not found' });
    const result = validateOrder(req.body);
    const { error } = validateOrder(req.body);
    if (error) {
    res.status(400).send(error.details[0].message);

    return;
  }
  order.Pickup = req.body.Pickup;
  order.destination = req.body.destination;
  order.contents = req.body.contents;
  order.value = req.body.value;
  order.weight = req.body.weight;
  order.sname = req.body.sname;
  order.senderId = req.body.senderId;
  order.semail = req.body.semail;
  order.remail = req.body.remail;
  order.rname = req.body.rname;
  order.raddress = req.body.raddress;
  order.status = req.body.status;
  res.status(200).json(order); 
}

  static getAllOrders(req, res) {
    res.status(200).json(parcels);
  }

  static getOneOrder(req, res) {
    const { id } = req.params;
    const order = parcels.find(a => a.id === parseInt(id));
    if (!order) return res.status(400).json({ message: 'The parcel with given ID was not found' });
    res.status(200).json(order);
  }

    static deleteOrder(req, res) {
    const { id } = req.params;
    const order = parcels.find(a => a.id === parseInt(id));
    if (!order) return res.status(400).json({ message: 'The parcel with given ID was not found' });
    const index = parcels.indexOf(order);
    parcels.splice(index, 1);
    res.send(order);
  }


  static cancelOrder(req, res) {
      const { id } = req.params;
      const order = parcels.find(a => a.id === parseInt(id));
      if (!order) return res.status(400).json({ message: 'The parcel with given ID was not found' });

    const result = validateCancel(req.body);
    const { error } = validateCancel(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);

      return;
    }
    order.status = 'canceled';
    res.status(200).json(order);
  }
}

const validateOrder = order => {

  const schema = {
    Pickup: Joi.string().min(3).required(),
    destination: Joi.string().min(3).required(),
    contents: Joi.string().min(3).required(),
    value: Joi.number().required(),
    weight: Joi.number().required(),
    location: Joi.string().min(3).required(),
    sname: Joi.string().min(3).required(),
    semail: Joi.string().email({ minDomainAtoms: 2 }).required(),
    senderId: Joi.number().required(),
    rname: Joi.string().min(3).required(),
    remail: Joi.string().email({ minDomainAtoms: 2 }).required(),
    raddress: Joi.string().min(3).required(),
    status: Joi.string().min(3)
  };

  return Joi.validate(order, schema);
};
const validateCancel = order => {

  const schema = {
    status: Joi.string().min(3)
  };

  return Joi.validate(order, schema);
};


export default ParcelControllers;
