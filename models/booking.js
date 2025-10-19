const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  guest: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  host: {
    // Storing the host ID directly for easier queries
    type: Schema.Types.ObjectId,
    ref: "User",
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
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Add a check to ensure endDate is after startDate
bookingSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    next(new Error("End date must be after start date"));
  } else {
    next();
  }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;