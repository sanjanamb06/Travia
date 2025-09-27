const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.signUpPage = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.confirmSignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const rU = await User.register(newUser, password); //passsport register method to register the user
    console.log(rU);
    req.login(rU, (err) => {
      //this function logs in the user without needing to signup+ login
      if (err) {
        return next(err);
      }
      req.flash("success", "User was registered!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginPage = async (req, res) => {
  res.render("users/login.ejs");
};

module.exports.confirmLogin = async (req, res) => {
  req.flash("success", "Welcome, You are logged in!");
  let redUrl = res.locals.redirectUrl || "/listings";
  console.log(redUrl);
  res.redirect(redUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    //built in method in passport to logout the user
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out");
    res.redirect("/listings");
  });
};

// User Dashboard
module.exports.dashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's listings
    const userListings = await Listing.find({ owner: userId }).populate('reviews');
    
    // Get user's reviews
    const userReviews = await Review.find({ author: userId }).populate('listing');
    
    // Calculate statistics
    const totalListings = userListings.length;
    const totalReviews = userReviews.length;
    
    // Calculate total views (if we had a views field)
    let totalViews = 0;
    userListings.forEach(listing => {
      totalViews += listing.reviews?.length || 0;
    });
    
    // Calculate average rating for user's listings
    let totalRating = 0;
    let reviewCount = 0;
    userListings.forEach(listing => {
      listing.reviews?.forEach(review => {
        totalRating += review.rating;
        reviewCount++;
      });
    });
    const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : 0;
    
    // Recent activity (last 5 reviews on user's listings)
    const recentReviews = await Review.find({})
      .populate({
        path: 'listing',
        match: { owner: userId }
      })
      .populate('author')
      .sort({ createdAt: -1 })
      .limit(5);
    
    const filteredRecentReviews = recentReviews.filter(review => review.listing);
    
    res.render("users/dashboard.ejs", {
      user: req.user,
      userListings,
      userReviews,
      stats: {
        totalListings,
        totalReviews,
        totalViews,
        averageRating
      },
      recentReviews: filteredRecentReviews
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    req.flash("error", "Error loading dashboard");
    res.redirect("/listings");
  }
};

// User Profile
module.exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render("users/profile.ejs", { user });
  } catch (error) {
    console.error('Profile error:', error);
    req.flash("error", "Error loading profile");
    res.redirect("/listings");
  }
};

// Update Profile
module.exports.updateProfile = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    
    // Update email if provided
    if (email && email !== user.email) {
      user.email = email;
    }
    
    // Update password if provided
    if (currentPassword && newPassword) {
      await user.changePassword(currentPassword, newPassword);
    }
    
    await user.save();
    req.flash("success", "Profile updated successfully!");
    res.redirect("/profile");
  } catch (error) {
    console.error('Profile update error:', error);
    req.flash("error", error.message || "Error updating profile");
    res.redirect("/profile");
  }
};