import express from 'express';
import { updateAddress, deleteUser } from '../controllers/crud.controller.js';

const router = express.Router();

router.put('/updateAddress/:email', updateAddress);
router.delete('/deleteUser', deleteUser);

export default router;