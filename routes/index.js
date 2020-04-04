const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');
const H_user = require('../models/H_user');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    fname: req.user.fname,
    lname: req.user.lname
  })
);

router.post('/search', forwardAuthenticated, (req, res) => {
  H_user.find({
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
