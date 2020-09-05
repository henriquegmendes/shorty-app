const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  data = [];

  response.render('dashboard', { layout: false, data });
})

module.exports = router;
