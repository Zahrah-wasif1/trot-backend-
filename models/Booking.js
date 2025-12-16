
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Active", "Completed", "Cancelled"], default: "Pending" }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
