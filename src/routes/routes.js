import express from 'express';
import { Router, json, urlencoded } from 'express';
import ParcelController from '../controllers/parcels';
import UserControllers from '../controllers/users';
const router = express.Router();

router.use(json());
router.use(urlencoded({ extended: false }));

router.post('/api/v1/parcels', ParcelController.createOrder);

router.get('/api/v1/parcels', ParcelController.getAllOrders);

router.get('/api/v1/parcels/:id', ParcelController.getOneOrder);

router.put('/api/v1/parcels/:id/cancel', ParcelController.cancelOrder);

router.put('/api/v1/parcels/:id', ParcelController.editOrder);

router.delete('/api/v1/parcels/:id', ParcelController.deleteOrder);



//user endpoints

router.post('/api/v1/users', UserControllers.createUser);

router.put('/api/v1/users/:id', UserControllers.editUser);

router.get('/api/v1/users', UserControllers.getAllUsers);

router.get('/api/v1/users/:id', UserControllers.getOneUser);

router.get('/api/v1/users/:senderId/parcels', UserControllers.getUserParcels);


router.delete('/api/v1/users/:id', UserControllers.deleteUser);


export default router;