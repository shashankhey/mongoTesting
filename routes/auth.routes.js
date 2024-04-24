import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
import { updateAddress } from '../controllers/crud.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);
// router.post('/updateAddress', updateAddress);

export default router;