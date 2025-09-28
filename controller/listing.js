const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

// Only initialize geocoding client if we have a valid token
let geocodingClient = null;
if (mapToken && mapToken !== 'your_mapbox_token_here' && mapToken.length > 10) {
  try {
    geocodingClient = mbxGeocoding({ accessToken: mapToken });
  } catch (error) {
    console.log("Warning: Invalid Mapbox token, maps will not be available");
  }
}

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.create = (req, res) => {
  res.render("listings/create.ejs");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  const showListing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!showListing) {
    req.flash("error", "Listing you requested does not exist!");
    res.redirect("/listings");
  }
  console.log(showListing);
  res.render("listings/show.ejs", { showListing });
};

module.exports.addNew = async (req, res) => {
  let response = null;
  
  // Only try geocoding if we have a valid client
  if (geocodingClient) {
    try {
      response = await geocodingClient
        .forwardGeocode({
          query: req.body.listing.location,
          limit: 1,
        })
        .send();
    } catch (error) {
      console.log("Geocoding error:", error.message);
    }
  }

  let url = req.file.path;
  let filename = req.file.filename;
  let listing = req.body.listing; //the data is from the body and listing obj created in create.ejs
  const newList = new Listing(listing);
  newList.owner = req.user._id;
  newList.image = { url, filename };

  // Set geometry if geocoding was successful
  if (response && response.body && response.body.features && response.body.features.length > 0) {
    newList.geometry = response.body.features[0].geometry;
  } else {
    // Default geometry (coordinates for a generic location if geocoding fails)
    newList.geometry = {
      type: "Point",
      coordinates: [0, 0] // Default coordinates
    };
  }

  let save = await newList.save();
  console.log(save);
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const showListing = await Listing.findById(id);
  if (!showListing) {
    req.flash("error", "Listing you requested does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { showListing });
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  console.log(req.body);
  req.flash("success", "Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let delList = await Listing.findByIdAndDelete(id);
  console.log(delList);
  req.flash("success", "Deleted successfully!");
  res.redirect("/listings");
};
