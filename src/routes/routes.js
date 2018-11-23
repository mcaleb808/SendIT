import express from 'express';
import { Router, json, urlencoded } from 'express';
import ParcelController from '../controllers/parcels';
const router = express.Router();

router.use(json());
router.use(urlencoded({ extended: false }));

router.post('/api/v1/parcels', ParcelController.create);

router.get('/api/v1/parcels', ParcelController.getAll);

router.get('/api/v1/parcels/:id', ParcelController.getOne);

export default router;