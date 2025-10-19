const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isBookingGuest } = require("../middleware.js");
const bookingController = require("../controller/booking.js");

// Show "My Bookings" page
router.get(
  "/my-bookings",
  isLoggedIn,
  wrapAsync(bookingController.showMyBookings)
);

// Cancel (Delete) Booking
router.delete(
  "/my-bookings/:bookingId",
  isLoggedIn,
  isBookingGuest, // New middleware to create
  wrapAsync(bookingController.cancelBooking)
);

module.exports = router;