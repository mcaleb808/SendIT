import express from 'express';
import { Router, json, urlencoded } from 'express';
import UserControllers from '../controllers/users';
const router = express.Router();

router.use(json());
router.use(urlencoded({ extended: false }));

router.post('/', UserControllers.createUser);

router.put('/:id', UserControllers.editUser);

router.get('/', UserControllers.getAllUsers);

router.get('/:id', UserControllers.getOneUser);

router.get('/:senderId/parcels', UserControllers.getUserParcels);


router.delete('/:id', UserControllers.deleteUser);



module.exports = router;