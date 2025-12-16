import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import carRoutes from './routes/carRoutes';
import bookingRoutes from './routes/bookingRoutes';
import contactRoutes from './routes/contactRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// MongoDB connection
export const initializeDB = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default app; // export the app for serverless
