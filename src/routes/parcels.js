import express from 'express';
import { Router, json, urlencoded } from 'express';
import ParcelController from '../controllers/parcels';
const router = express.Router();

router.use(json());
router.use(urlencoded({ extended: false }));

router.post('/', ParcelController.createOrder);

router.get('/', ParcelController.getAllOrders);

router.get('/:id', ParcelController.getOneOrder);

router.put('/:id/cancel', ParcelController.cancelOrder);

router.put('/:id', ParcelController.editOrder);

router.delete('/:id', ParcelController.deleteOrder);



module.exports = router;