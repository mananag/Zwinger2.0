require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
// const findOrCreate = require('findorcreate-promise');

// Load User model
const user = require('../models/user');


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      // Match user
      user.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, {
            message: 'That email is not registered'
          });
        }
        if (!user.active) {
          return done(null, false, {
            message: 'Sorry, you must validate email first'
          });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: 'Password incorrect'
            });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/middle",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // User.findOne({
      //   googleID:profile.id
      // }).then(user=>{
      //   if(!user){
      //     var user= new User({
      //       googleID:profile.id,
      //       fname:profile.name.familyName
      //     });
      //
      //   }
      //
      // });

      user.findOrCreate({ googleId: profile.id },{ fname: profile.name.givenName,lname:profile.name.familyName ,email: profile.emails[0].value },  function (err, user) {

        return cb(err, user);
      });
      // user.findOrCreate({
      //   googleId: profile.id
      // }, {
      //   googleId: profile.id,
      //   fname: profile.name.givenName,
      //   lname:profile.name.familyName
      // }, function(err, user) {
      //   return cb(err, user);
      // });
    }

  ));

};
