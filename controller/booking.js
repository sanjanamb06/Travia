const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

// Controller to create a new booking
module.exports.createBooking = async (req, res) => {
  let { id } = req.params; // Listing ID
  let { startDate, endDate } = req.body.booking;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  
    // --- Check for Date Conflicts ---
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  const existingBooking = await Booking.findOne({
    listing: id,
    $or: [
      // Case 1: New booking starts during an existing booking
      { startDate: { $lte: newStartDate }, endDate: { $gte: newStartDate } },
      // Case 2: New booking ends during an existing booking
      { startDate: { $lte: newEndDate }, endDate: { $gte: newEndDate } },
      // Case 3: New booking engulfs an existing booking
      { startDate: { $gte: newStartDate }, endDate: { $lte: newEndDate } }
    ],
  });

  if (existingBooking) {
    req.flash("error", "These dates are not available. Please select different dates.");
    return res.redirect(`/listings/${id}`);
  }

  // --- Calculate Total Price ---
  const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
  const dayCount = (newEndDate.getTime() - newStartDate.getTime()) / oneDay;
  
  // Ensure at least one night is booked
  if (dayCount < 1) {
     req.flash("error", "Bookings must be for at least one night.");
     return res.redirect(`/listings/${id}`);
  }

  const totalPrice = listing.price * dayCount;

  // --- Create and Save Booking ---
  const newBooking = new Booking({
    listing: id,
    guest: req.user._id,
    host: listing.owner,
    startDate: newStartDate,
    endDate: newEndDate,
    totalPrice: totalPrice,
  });

  let savedBooking = await newBooking.save();

  // --- Update Listing and User ---
  listing.bookings.push(savedBooking._id);
  req.user.bookings.push(savedBooking._id);
  
  await listing.save();
  await req.user.save(); // Make sure to save the user as well

  req.flash("success", "Booking confirmed!");
  res.redirect(`/user/my-bookings`); 
};

// Controller to show "My Bookings" page
module.exports.showMyBookings = async (req, res) => {
  // Find the current user and populate all their bookings,
  // and for each booking, populate the associated listing details.
  const user = await User.findById(req.user._id).populate({
    path: "bookings",
    populate: {
      path: "listing",
    },
  });

  res.render("users/my_bookings.ejs", { bookings: user.bookings });
};

// Controller to cancel (delete) a booking
module.exports.cancelBooking = async (req, res) => {
  let { bookingId } = req.params;

  // Find the booking
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    req.flash("error", "Booking not found!");
    return res.redirect("/user/my-bookings");
  }

  // Authorization: Only the guest who made the booking can cancel it
  if (!booking.guest.equals(req.user._id)) {
    req.flash("error", "You are not authorized to cancel this booking.");
    return res.redirect("/user/my-bookings");
  }

  // Delete the booking
  await Booking.findByIdAndDelete(bookingId);

  // Remove the booking reference from the Listing
  await Listing.findByIdAndUpdate(booking.listing, {
    $pull: { bookings: bookingId },
  });

  // Remove the booking reference from the User
  await User.findByIdAndUpdate(booking.guest, {
    $pull: { bookings: bookingId },
  });

  req.flash("success", "Booking cancelled successfully!");
  res.redirect("/user/my-bookings");
};