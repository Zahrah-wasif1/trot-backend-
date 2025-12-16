const express = require('express');
const { submitContact, getContacts, getContactById } = require('../controllers/contactController.js');
const auth = require('../middleware/auth.js');
const adminOnly = require('../middleware/admin.js');

const router = express.Router();

// Public route - submit contact form
router.post('/', submitContact);

// Admin routes (optional - for future admin panel)
router.get('/', auth, adminOnly, getContacts);
router.get('/:id', auth, adminOnly, getContactById);

module.exports = router;
