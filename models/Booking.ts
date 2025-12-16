import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  amount: number;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carId: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.models.Booking 
  ? (mongoose.models.Booking as unknown as mongoose.Model<IBooking>)
  : mongoose.model<IBooking>('Booking', BookingSchema);
export default Booking;

