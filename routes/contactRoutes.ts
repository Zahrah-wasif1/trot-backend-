import { Router } from 'express';
import { submitContact, getContacts, getContactById } from '../controllers/contactController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Public route - submit contact form
router.post('/', submitContact);

// Admin routes (optional - for future admin panel)
router.get('/', auth, getContacts);
router.get('/:id', auth, getContactById);

export default router;

