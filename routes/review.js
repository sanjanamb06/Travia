const express = require("express");
const router = express.Router({ mergeParams: true }); //merge parent route params(the one in app.js) with child route
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const {isLoggedIn,isReviewAuthor,saveRedirectUrl}=require("../middleware.js");

const reviewController=require("../controller/review.js")

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

//reviews post route
router.post(
  "/",isLoggedIn,
  validateReview,
  wrapAsync(reviewController.addReview)
);

router.delete(
  "/:reviewId",isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.delReview)
);

module.exports = router;
