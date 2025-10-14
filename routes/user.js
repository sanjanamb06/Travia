const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

const userController=require("../controller/user.js");

router.get("/signup", userController.signUpPage);

router.post(
  "/signup",
  wrapAsync(userController.confirmSignUp)
);

router.get("/login", userController.loginPage);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }), //check if user already exists
  wrapAsync(userController.confirmLogin)
);

router.get("/logout", userController.logout);

// Dashboard routes
router.get("/dashboard", isLoggedIn, wrapAsync(userController.dashboard));
router.get("/profile", isLoggedIn, wrapAsync(userController.profile));
router.post("/profile", isLoggedIn, wrapAsync(userController.updateProfile));

module.exports = router;
