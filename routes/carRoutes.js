const express = require('express');
const auth = require('../middleware/auth.js');
const adminOnly = require('../middleware/adminOnly.js');
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} = require('../controllers/carsController.js');

const router = express.Router();

// Public routes
router.get('/', getCars);
router.get('/:id', getCarById);

// Protected routes (admin only)
router.post('/', auth, adminOnly, createCar);
router.put('/:id', auth, adminOnly, updateCar);
router.delete('/:id', auth, adminOnly, deleteCar);

module.exports = router;
