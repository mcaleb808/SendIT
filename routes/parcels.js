import Joi from 'joi';
import express from 'express';
import Order from '../models/parcels';
const router = express.Router();

export const orders = [
	new Order (1, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	new Order (2, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	new Order (3, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	new Order (4, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	new Order (5, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	new Order (6, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	new Order (7, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	new Order (8, 'Kigali',  'rusizi', 'modem devices', 50000, 2, 'kigali', 1, 'Mugisha Caleb Didier', 'mcaleb808@gmail.com', 'mugabo felix', 'mcaleb808@gmail.com', 'rusizi', 'generated'),
	
	];

router.get('/', (req, res) => {
	res.send(orders);
});

router.post('/', (req, res) => {

	const result= validateOrder(req.body);
	const {error}= validateOrder(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		
	return;
	}
	const order = {
		id: orders.length + 1,
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
	orders.push(order);
	res.send(order);
});

router.put('/:id', (req, res)=> {
	const order = orders.find(c => c.id ===parseInt(req.params.id));
	if (!order) return res.status(404).send('The parcel with given ID was not found');

	const result= validateOrder(req.body);
	const {error}= validateOrder(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		
	return;
	}
	order.Pickup= req.body.Pickup;
	order.destination= req.body.destination;
	order.contents= req.body.contents;
	order.value= req.body.value;
	order.weight= req.body.weight;
	order.sname= req.body.sname;
	order.senderId= req.body.senderId;
	order.semail= req.body.semail;
	order.remail= req.body.remail;
	order.rname= req.body.rname;
	order.raddress= req.body.raddress;
	order.status= req.body.status;
	res.send(order);
});

router.put('/:id/cancel', (req, res)=> {
	const order = orders.find(c => c.id ===parseInt(req.params.id));
	if (!order) return res.status(404).send('The parcel with given ID was not found');

	const result= validateCancel(req.body);
	const {error}= validateCancel(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		
	return;
	}
	order.status= 'canceled' ;
	res.send(order);
});

router.get('/:id', (req, res) => {
	const order = orders.find(c => c.id ===parseInt(req.params.id));
	if (!order) return res.status(404).send('The parcel with given ID was not found');
	res.send(order);
});

router.delete('/:id', (req, res) => {
	const order = orders.find(c => c.id ===parseInt(req.params.id));
	if (!order) return res.status(404).send('The parcel with given ID was not found');

	const index = orders.indexOf(order);
	orders.splice(index, 1);
	res.send(order);
});


router.get('/:senderId/parcels', (req, res) => {
	const order = orders.find(c => c.senderId ===parseInt(req.params.senderId));
	if (!order) return res.status(404).send('The parcels with given sender Id was not found');
	res.send(order);
});


const validateOrder= (order) => {

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
}
const validateCancel= (order) => {

	const schema = {
	status: Joi.string().min(3)
	};

	return Joi.validate(order, schema);
}

module.exports = router;