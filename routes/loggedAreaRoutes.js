const express = require('express');
const Url = require('../models/Url');


const router = express.Router();

router.get('/dashboard', (request, response) => {
  data = [];

  response.render('dashboard', { loggedUser: true, data });
})

router.post('/url/create', async (request, response) => {
  console.log(request.body)

  const { redirectUrl, expirationDate } = request.body;

  const splitDate = expirationDate.split('-');
  const date = new Date(splitDate[0], splitDate[1], splitDate[2], 23, 59).getTime();

  const newUrl = new Url({
    redirectUrl,
    expirationDateMs: date,
  });

  response.redirect('https://' + redirectUrl);

});

module.exports = router;
