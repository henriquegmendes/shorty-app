const express = require('express');
const Url = require('../models/Url');
const User = require('../models/User');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login?sessionExpired=true');

    return;
  }

  next();
});

router.get('/dashboard', async (req, res) => {
  try {
    const data = await Url.find({ owner: req.session.currentUser._id });
  
    res.render('dashboard', { data, loggedUser: req.session.currentUser });
  } catch (error) {
    console.log(error);
  }
});

router.post('/url/create', async (req, res) => {
  const { protocol, redirectUrl, expirationDate } = req.body;
  
  const dateToArray = expirationDate.split('-');

  const dateMs = new Date(dateToArray[0], +dateToArray[1] - 1, dateToArray[2]).getTime();
  
  const newUrl = new Url({
    redirectUrl: protocol + redirectUrl,
    shortUrl: 'http://localhost:3000/s',
    expirationDateMs: dateMs,
    owner: req.session.currentUser._id,
  });

  newUrl.shortUrl += '/' + newUrl._id;

  await newUrl.save();

  res.redirect('/dashboard');
});

module.exports = router;
