import mongoose, { Document, Schema } from 'mongoose';

export interface ICar extends Document {
  name: string;
  type: string;
  seats: number;
  price: number;
  image: string;
  description?: string;
  features?: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['Sedan', 'SUV', 'Luxury', 'Sports'],
    },
    seats: {
      type: Number,
      required: true,
      min: 2,
      max: 10,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    features: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose.model() returns existing model if already compiled, or creates new one
// @ts-expect-error - Mongoose model types are complex, but runtime behavior is correct
const Car = mongoose.model<ICar>('Car', CarSchema);
export default Car;

