const Car = require('../models/Car.js');

// Create a new car (admin only)
const createCar = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
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
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get single car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update car (admin only)
const updateCar = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
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
const deleteCar = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
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

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
