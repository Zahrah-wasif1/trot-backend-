const Booking = require('../models/Booking.js');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate, amount, phone, email } = req.body;

    const booking = await Booking.create({
      userId: req.user.id, // assuming req.user is set by auth middleware
      carId,
      startDate,
      endDate,
      amount,
      phone,
      email,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all bookings for logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('carId userId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get single booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('carId userId');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Ensure user owns the booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Ensure user owns the booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Ensure user owns the booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
};
