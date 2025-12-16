const express = require('express');
const {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} = require('../controllers/bookingsController.js');
const auth = require('../middleware/auth.js');
const adminOnly = require('../middleware/adminOnly.js');

const router = express.Router();

// Create booking (user)
router.post('/', auth, createBooking);

// Get all bookings for logged-in user
router.get('/', auth, getUserBookings);

// Get single booking by ID
router.get('/:id', auth, getBookingById);

// Update booking status (user/admin)
router.put('/:id/status', auth, updateBookingStatus);

// Delete booking (user/admin)
router.delete('/:id', auth, deleteBooking);

// Example: If you want only admin to update/delete all bookings globally, you can do:
// router.put('/:id/status', auth, adminOnly, updateBookingStatus);
// router.delete('/:id', auth, adminOnly, deleteBooking);

module.exports = router;
