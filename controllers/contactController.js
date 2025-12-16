const Contact = require('../models/Contact.js');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Get all contact submissions (admin only - optional)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Get single contact by ID (admin only - optional)
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

module.exports = {
  submitContact,
  getContacts,
  getContactById,
};
