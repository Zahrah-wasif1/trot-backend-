import { Router } from 'express';
import {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingsController.ts';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, createBooking);
router.get('/', auth, getUserBookings);
router.get('/:id', auth, getBookingById);
router.put('/:id/status', auth, updateBookingStatus);
router.delete('/:id', auth, deleteBooking);

export default router;
