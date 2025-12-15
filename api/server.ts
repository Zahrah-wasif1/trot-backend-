import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes';
import carRoutes from '../routes/carRoutes';
import bookingRoutes from '../routes/bookingRoutes';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI!);
  isConnected = true;
};

connectDB().then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Export as serverless function
export default serverless(app);
