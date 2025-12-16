const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose.model() returns existing model if already compiled, or creates new one
const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
