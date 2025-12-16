import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from '../controllers/carsController.js';

const router = Router();

// Public routes
router.get('/', getCars);
router.get('/:id', getCarById);

// Protected routes (admin only)
router.post('/', auth, createCar);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

export default router;
