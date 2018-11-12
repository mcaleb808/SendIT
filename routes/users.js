import Joi from 'joi';
import express from 'express';
import User from '../models/users';
import Order from '../models/parcels';
const router = express.Router();

const users = [
	new User( 1,'Mugisha Caleb Didier', 'Caleb','Calebmugisha' ,'mcaleb808@gmail.com') 
	];

	const orders = [
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
	res.send(users);
});

router.post('/', (req, res) => {

	const result= validateUser(req.body);
	const {error}= validateUser(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		
	return;
	}
	const user = {
		id: users.length + 1,
		name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	};
	users.push(user);
	res.send(user);
});

router.put('/:id', (req, res)=> {
	const user = users.find(c => c.id ===parseInt(req.params.id));
	if (!user) return res.status(404).send('The user with given ID was not found');

	const result= validateUser(req.body);
	const {error}= validateUser(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		
	return;
	}
	user.name= req.body.name;
	user.username= req.body.username;

	res.send(user);
});

router.get('/:id', (req, res) => {
	const user = users.find(c => c.id ===parseInt(req.params.id));
	if (!user) return res.status(404).send('The user with given ID was not found');
	res.send(user);
});

router.delete('/:id', (req, res) => {
	const user = users.find(c => c.id ===parseInt(req.params.id));
	if (!user) return res.status(404).send('The user with given ID was not found');

	const index = users.indexOf(user);
	users.splice(index, 1);
	res.send(user);
});

const validateUser= (user) => {

	const schema = {
	name: Joi.string().min(3).required(),
	username: Joi.string().min(3).required(),
	password: Joi.string().min(3).required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required()
	};

	return Joi.validate(user, schema);
}

module.exports = router;