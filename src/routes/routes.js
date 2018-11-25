import express from 'express';
import { Router, json, urlencoded } from 'express';
import UserControllers from '../controllers/users';
import Auth from '../middleware/Auth';
const router = express.Router();

router.use(json());
router.use(urlencoded({ extended: false }));
//user endpoints

router.post('/api/v1/auth/signup',UserControllers.signUp);
router.get('/api/v1/auth/login', UserControllers.signIn);



export default router;