const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

router.get('/dashboard', (request, response) => {
  response.render('dashboard');
});

router.post('/url/create', async (request, response) => {
  const { protocol, redirectUrl, expirationDate } = request.body;
  
  const dateToArray = expirationDate.split('-');

  const dateMs = new Date(dateToArray[0], +dateToArray[1] - 1, dateToArray[2]).getTime();
  
  const newUrl = new Url({
    redirectUrl: protocol + redirectUrl,
    shortUrl: 'http://localhost:3000/s',
    expirationDateMs: dateMs,
  });

  newUrl.shortUrl += '/' + newUrl._id;

  await newUrl.save();

  response.redirect('/dashboard');
});

module.exports = router;
