const express = require("express");
const router = express.Router();

const passport = require("passport");

const User = require("../../models/User");
const bcrypt = require("bcryptjs");

//Login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

//Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Successfully Logout");
    res.redirect("/users/login");
  });
});


router.get("/register", (req, res) => {
  res.render("register");
});


//Register
router.post("/register", (req, res) => {
  const { name, password, confirmPassword } = req.body;
  User.findOne({ name })
    .then((user) => {
      if (user) {
        req.flash("error_msg", "Account already exist！");
        return res.redirect("register");
      }
      if (password !== confirmPassword) {
        req.flash("error_msg", "password is not equal to confirmpassword!");
        return res.redirect("register");
      }

      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          User.create({ name, password: hash }).then(() => {
            req.flash("success_msg", "Successfully register!");
            res.redirect("/");
          });
        });
    })
    .catch((err) => console.log(err));
});
module.exports = router;