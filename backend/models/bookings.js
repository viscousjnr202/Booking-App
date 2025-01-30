import mongoose from "mongoose";

const bookingSchemma = new mongoose.Schema({
  name: { type: String, required: true },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guest: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Bookings = mongoose.model("Booking", bookingSchemma);

export default Bookings;
