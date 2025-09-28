if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl = process.env.ATLASDB_URL || "mongodb://localhost:27017/travia-local";

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Connected to MongoDB successfully");
    console.log(`📍 Database URL: ${dbUrl.includes('localhost') ? 'Local MongoDB' : 'MongoDB Atlas'}`);
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
    if (dbUrl.includes('localhost')) {
      console.log("💡 Make sure MongoDB is running locally. You can:");
      console.log("   1. Install MongoDB Community Server");
      console.log("   2. Or use MongoDB Atlas by updating ATLASDB_URL in .env");
    }
    process.exit(1);
  }
}

main();

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60,
});

store.on("error", () => {
  console.log("Error in mongo session store", err);
});

const sessionOptions = {
  store: store, //storing session related info in mongoatlas
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); //initializes passport
app.use(passport.session()); //uses the same user for entire session
passport.use(new LocalStrategy(User.authenticate())); //this authenticates the user

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//this matches listings routes to the listing.js file in the route folder
//this is called express routung using .Router() fn to segregate routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);

//handle error for unknown routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not found"));
});

//error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("listings/error.ejs", { message }); // ✅ Ensure status is set
});

app.listen(8080, () => {
  console.log("Server running");
});
