const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.addReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let nR = new Review(req.body.review);
    nR.author=req.user._id;
    listing.reviews.push(nR);

    await nR.save();
    await listing.save();
    req.flash("success","Review created!");
    res.redirect(`/listings/${listing._id}`);
  }

  module.exports.delReview=async (req, res) => {
    let { id, reviewId } = req.params;
    if (!id) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
    //pull operater removes the instance of that element from db
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listings/${id}`);
  }