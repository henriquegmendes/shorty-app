const express = require('express');
const Url = require('../models/Url');

const router = express.Router();

router.get('/dashboard', async (request, response) => {
  try {
    const data = await Url.find();
  
    response.render('dashboard', { data });
  } catch (error) {
    console.log(error);
  }
})

router.post('/url/create', async (request, response) => {
  try {
    console.log(request.body)
    const { protocol, redirectUrl, expirationDate } = request.body;
  
    const splitDate = expirationDate.split('-');
    const date = new Date(splitDate[0], splitDate[1], splitDate[2], 23, 59).getTime();
  
    const newUrl = new Url({
      redirectUrl: protocol + redirectUrl,
      expirationDateMs: date,
    });

    newUrl.shortUrl = `http://localhost:3000/s/${newUrl._id}`;

    await newUrl.save();

    response.redirect('/dashboard');
  } catch (error) {
    console.log(error)
  }

});

router.get('/s/:urlId', async (request, response) => {
  const url = await Url.findById(request.params.urlId);

  response.redirect(url.redirectUrl);
});

module.exports = router;
