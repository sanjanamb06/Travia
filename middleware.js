const Listing = require("./models/listing");
const Review = require("./models/review");
const Booking = require("./models/booking.js"); 

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirectUrl is getting saved here
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to edit");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    if (req.session.redirectUrl.includes("_method=DELETE")) {
      req.session.redirectUrl = "/listings";
    }
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id,reviewId } = req.params;
  let listing = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isBookingGuest = async (req, res, next) => {
  let { bookingId } = req.params;
  let booking = await Booking.findById(bookingId);
  if (!booking) {
    req.flash("error", "Booking not found!");
    return res.redirect("/user/my-bookings");
  }
  if (!booking.guest.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the guest for this booking");
    return res.redirect(`/user/my-bookings`);
  }
  next();
};