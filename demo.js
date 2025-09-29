// Demo app for showcasing Travia features without database dependencies
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Import demo controller
const demoController = require("./demoController.js");

// Basic setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Simple flash messages mock
app.use((req, res, next) => {
  res.locals.success = null;
  res.locals.error = null;
  res.locals.currUser = null; // Mock no user logged in
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

// Simple error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Travia Demo Server running on http://localhost:${PORT}`);
  console.log(`📸 Perfect for taking screenshots of your features!`);
  console.log(`🔍 Test the search and filter system at /listings`);
});

module.exports = app;