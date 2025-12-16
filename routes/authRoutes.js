const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController.js');
const auth = require('../middleware/auth.js');
const adminOnly = require('../middleware/adminOnly.js');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Example admin-only route
router.get('/admin', auth, adminOnly, (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

module.exports = router;
