const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const carRoutes = require('./routes/carRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');
const contactRoutes = require('./routes/contactRoutes.js');

dotenv.config();

const app = express();

// Middleware - CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || true, // Allow all origins if FRONTEND_URL not set
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// MongoDB connection
const initializeDB = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Start server (local dev)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = { default: app, initializeDB };
