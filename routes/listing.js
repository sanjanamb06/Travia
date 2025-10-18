//includes all the routes to listings
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema,bookingSchema}=require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controller/listing.js");
const bookingController = require("../controller/booking.js"); 
// Search API endpoint for AJAX requests
router.get('/api/search', wrapAsync(listingController.searchAPI));

//this is a middleware related to joi to validate listing
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
const validateBooking = (req, res, next) => {
  let { error } = bookingSchema.validate(req.body);
  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
//Listing PAGE
//add your listing
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.addNew)
  );

//create ur listing
router.get("/create", isLoggedIn, listingController.create);

//show the listing
router.get("/:id", wrapAsync(listingController.show));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

//booking route
router.post(
  "/:id/book",
  isLoggedIn,
  validateBooking,
  wrapAsync(bookingController.createBooking)
);
//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.update)
);

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.delete));

module.exports = router;
