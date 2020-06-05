const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');
const user = require('../models/user');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    fname: req.user.fname,
    lname: req.user.lname
  })
);


router.get("/auth/google",
  passport.authenticate('google', { scope: ["email", " profile"] })
);

router.get("/auth/google/middle",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/dashboard");
  });



router.post('/search', forwardAuthenticated, (req, res) => {
  user.find({
    city: req.body.city
  }).then(city => {
    if (!city) {
      console.log("no city found")
    } else {
      city.forEach(console.log)
      // city.forEach(console.log;
      res.render('index')

    }


  }).catch(err => console.log(err));
});







module.exports = router;
