const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  try {
    let { search, country, minPrice, maxPrice, sortBy } = req.query;
    
    // Build query object
    let query = {};
    
    // Search functionality
    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Country filter
    if (country && country.trim() && country !== 'all') {
      query.country = { $regex: country, $options: 'i' };
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    // Build sort object
    let sortOptions = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'newest':
        sortOptions._id = -1;
        break;
      case 'oldest':
        sortOptions._id = 1;
        break;
      default:
        sortOptions._id = -1; // Default to newest first
    }
    
    // Execute query
    const allListings = await Listing.find(query).sort(sortOptions);
    
    // Get unique countries for filter dropdown
    const countries = await Listing.distinct('country');
    
    // Search statistics
    const totalListings = await Listing.countDocuments();
    const filteredCount = allListings.length;
    
    res.render("listings/index.ejs", { 
      allListings, 
      countries,
      searchParams: req.query,
      totalListings,
      filteredCount
    });
  } catch (error) {
    console.error('Error in listings index:', error);
    req.flash("error", "Something went wrong while fetching listings");
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { 
      allListings, 
      countries: [],
      searchParams: {},
      totalListings: allListings.length,
      filteredCount: allListings.length
    });
  }
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
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  let listing = req.body.listing; //the data is from the body and listing obj created in create.ejs
  const newList = new Listing(listing);
  newList.owner = req.user._id;
  newList.image = { url, filename };

  newList.geometry=response.body.features[0].geometry;
  let save=await newList.save();
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

// API endpoint for search functionality
module.exports.searchAPI = async (req, res) => {
  try {
    let { search, country, minPrice, maxPrice, sortBy, limit = 20 } = req.query;
    
    // Build query object
    let query = {};
    
    // Search functionality
    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Country filter
    if (country && country.trim() && country !== 'all') {
      query.country = { $regex: country, $options: 'i' };
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    
    // Build sort object
    let sortOptions = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'newest':
        sortOptions._id = -1;
        break;
      case 'oldest':
        sortOptions._id = 1;
        break;
      default:
        sortOptions._id = -1;
    }
    
    // Execute query with limit
    const listings = await Listing.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .select('title description location country price image');
    
    // Get total count for pagination
    const totalCount = await Listing.countDocuments(query);
    
    res.json({
      success: true,
      listings,
      totalCount,
      hasMore: totalCount > parseInt(limit)
    });
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({
      success: false,
      message: 'Error performing search',
      error: error.message
    });
  }
};
