// Enhanced demo with dashboard functionality
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Import demo controller
const demoController = require("./demoController.js");

// Mock user data
const mockUser = {
  _id: "demo-user-id",
  username: "DemoUser",
  email: "demo@travia.com"
};

// Mock dashboard data
const mockStats = {
  totalListings: 3,
  totalViews: 45,
  totalReviews: 12,
  averageRating: 4.5
};

const mockUserListings = [
  {
    _id: "1",
    title: "Cozy Mountain Cabin",
    location: "Manali, Himachal Pradesh",
    price: 2500,
    image: {
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    reviews: [
      { rating: 5, comment: "Amazing place!", author: { username: "John" } },
      { rating: 4, comment: "Great location", author: { username: "Sara" } }
    ]
  },
  {
    _id: "2",
    title: "Beach House Paradise",
    location: "Goa",
    price: 4500,
    image: {
      url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    reviews: [
      { rating: 5, comment: "Perfect vacation!", author: { username: "Mike" } }
    ]
  },
  {
    _id: "3",
    title: "Urban Loft Apartment",
    location: "Mumbai, Maharashtra",
    price: 3500,
    image: {
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    reviews: []
  }
];

const mockRecentReviews = [
  {
    _id: "r1",
    rating: 5,
    comment: "Amazing stay! Highly recommended.",
    author: { username: "Alice" },
    listing: { title: "Cozy Mountain Cabin", _id: "1" },
    createdAt: new Date()
  },
  {
    _id: "r2", 
    rating: 4,
    comment: "Great location and clean rooms.",
    author: { username: "Bob" },
    listing: { title: "Beach House Paradise", _id: "2" },
    createdAt: new Date()
  }
];

// Basic setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Simple flash messages and user mock
app.use((req, res, next) => {
  res.locals.success = null;
  res.locals.error = null;
  res.locals.currUser = mockUser; // Mock logged-in user
  next();
});

// Demo routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.get("/listings", demoController.indexDemo);
app.get("/listings/api/search", demoController.searchAPIDemo);
app.get("/listings/new", demoController.createDemo);
app.get("/listings/:id", demoController.showDemo);

// Dashboard route
app.get("/dashboard", (req, res) => {
  res.render("users/dashboard.ejs", {
    user: mockUser,
    userListings: mockUserListings,
    userReviews: [],
    stats: mockStats,
    recentReviews: mockRecentReviews
  });
});

// Profile route
app.get("/profile", (req, res) => {
  res.render("users/profile.ejs", {
    user: mockUser
  });
});

// Mock login/logout
app.get("/login", (req, res) => {
  res.send(`
    <div style="padding: 50px; text-align: center; font-family: Arial;">
      <h2>Demo Login Page</h2>
      <p>In demo mode, you're automatically logged in as: <strong>${mockUser.username}</strong></p>
      <a href="/dashboard" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
    </div>
  `);
});

app.get("/logout", (req, res) => {
  res.send(`
    <div style="padding: 50px; text-align: center; font-family: Arial;">
      <h2>Logged Out</h2>
      <p>You have been logged out successfully!</p>
      <a href="/listings" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Back to Listings</a>
    </div>
  `);
});

// Simple error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Travia Enhanced Demo Server running on http://localhost:${PORT}`);
  console.log(`📸 Perfect for taking screenshots of your features!`);
  console.log(`🔍 Test the search system at /listings`);
  console.log(`📊 Check out the dashboard at /dashboard`);
  console.log(`👤 View the profile page at /profile`);
});

module.exports = app;