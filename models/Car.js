const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ['Sedan', 'SUV', 'Luxury', 'Sports'] },
    seats: { type: Number, required: true, min: 2, max: 10 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    description: { type: String },
    features: { type: [String], default: [] },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', CarSchema);
