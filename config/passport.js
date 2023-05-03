const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  
  //initialization
  app.use(passport.initialize());
  app.use(passport.session());


  //set local authentication mechanism
  passport.use(
    new localStrategy({ usernameField: "name" }, (name, password, done) => {
      User.findOne({ name })
        .then((user) => {
          if (!user) return done(null, false, { message: "user doesn't exist" });
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch)
              return done(null, user);
          });
              return done(null, false, { message: "password incorrect"});
        })
        .catch((err) => done(err, false));
    })
  );


  

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};