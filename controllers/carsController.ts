import { Request, Response } from 'express';
import Car, { ICar } from '../models/Car';
import { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';

// Create a new car (admin only)
export const createCar = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can add cars' });
    }

    const { name, type, seats, price, image, description, features, available } = req.body;

    const car = await Car.create({ name, type, seats, price, image, description, features, available });
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all cars
export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get single car by ID
export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update car (admin only)
export const updateCar = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update cars' });
    }

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    Object.assign(car, req.body); // update fields from body
    await car.save();

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete car (admin only)
export const deleteCar = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete cars' });
    }

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    await car.deleteOne();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
