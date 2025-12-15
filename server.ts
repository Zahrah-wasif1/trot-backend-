import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => console.log('Server running on port 5000'));
