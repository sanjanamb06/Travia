const User = require("../models/user.js");


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

module.exports.logout=(req, res) => {
    req.logout((err) => {
      //built in method in passport to logout the user
      if (err) {
        return next(err);
      }
      req.flash("success", "you are logged out");
      res.redirect("/listings");
    });
  }