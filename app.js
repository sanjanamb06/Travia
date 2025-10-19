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

const bookingRouter = require("./routes/booking.js");

// Add root route redirect to listings
app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  if (!dbUrl) {
    throw new Error("MongoDB connection string (ATLASDB_URL) is not defined in .env file");
  }
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("✅ MongoDB connection successful");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("💡 Please check your MongoDB connection string in .env file");
    console.log("   For local MongoDB: mongodb://localhost:27017/travia");
    console.log("   For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/travia");
  });

// Create MongoStore only if dbUrl is available
let store;
if (dbUrl) {
  try {
    store = MongoStore.create({
      mongoUrl: dbUrl,
      crypto: {
        secret: process.env.SECRET,
      },
      touchAfter: 24 * 60 * 60,
    });

    store.on("error", (err) => {
      console.log("Error in mongo session store:", err);
    });
  } catch (err) {
    console.warn("Could not create MongoDB store, using memory store:", err.message);
  }
}

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Add MongoDB store if available, otherwise use default memory store
if (store) {
  sessionOptions.store = store;
  console.log("Using MongoDB session store");
} else {
  console.log("Using memory session store (sessions will not persist)");
}

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
  res.locals.currUser = req.user || null; // Ensure currUser is always defined
  next();
});

//this matches listings routes to the listing.js file in the route folder
//this is called express routung using .Router() fn to segregate routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);
app.use("/user", bookingRouter);


//handle error for unknown routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not found"));
});

//error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("listings/error.ejs", { 
    message, 
    currUser: req.user || null,
    success: [], // <-- FIX: Pass an empty array
    error: []    // <-- FIX: Pass an empty array
 });
});

app.listen(8080, () => {
  console.log("Server running");
});
