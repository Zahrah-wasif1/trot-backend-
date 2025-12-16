import { Request, Response } from 'express';
import Booking, { IBooking } from '../models/Booking.js';
import { AuthRequest } from '../middleware/auth.js';
import mongoose from 'mongoose';

// Create a new booking
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { carId, startDate, endDate, amount, phone, email } = req.body;

    const booking = await Booking.create({
      userId: req.user!.id,
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
export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user!.id }).populate('carId userId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get single booking by ID
export const getBookingById = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('carId userId');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Ensure user owns the booking
    if (booking.userId.toString() !== req.user!.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update booking status
export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Ensure user owns the booking
    if (booking.userId.toString() !== req.user!.id) {
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
export const deleteBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Ensure user owns the booking
    if (booking.userId.toString() !== req.user!.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await booking.deleteOne();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

