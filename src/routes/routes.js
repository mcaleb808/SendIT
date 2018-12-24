import express from 'express';
import { Router, json, urlencoded } from 'express';
import UserControllers from '../controllers/users';
import ParcelControllers from '../controllers/parcels';
import Auth from '../middleware/Auth';
const router = express.Router();

router.use(json());
router.use(urlencoded({ extended: false }));

router.post('/api/v1/auth/signup', UserControllers.signUp);
router.post('/api/v1/auth/login', UserControllers.signIn);
router.delete('/api/v1/user/:id', UserControllers.deleteUser);

router.post('/api/v1/parcels', Auth.verifyToken, ParcelControllers.createParcel);
router.get('/api/v1/parcels', Auth.verifyToken, ParcelControllers.getAllParcels);
router.get('/api/v1/parcels/:id', Auth.verifyToken, ParcelControllers.getParcel);
router.put('/api/v1/parcels/:id/cancel', Auth.verifyToken, ParcelControllers.cancelParcel);
router.put('/api/v1/parcels/:id/destination', Auth.verifyToken, ParcelControllers.changeDestination);
router.delete('/api/v1/users', Auth.verifyToken, UserControllers.deleteUser);
router.get('/api/v1/admin/parcels', Auth.verifyToken, Auth.checkUser, ParcelControllers.getAll);
router.get('/api/v1/admin/parcels/:id', Auth.verifyToken, Auth.checkUser, ParcelControllers.getOneParcelAdmin);
router.put('/api/v1/parcels/:id/edit', Auth.verifyToken, Auth.checkUser, ParcelControllers.adminEdit);







export default router;