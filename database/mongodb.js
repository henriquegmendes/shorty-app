const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shorty-database', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Conectado no banco de Dados!');
  })
  .catch(error => {
    console.log(error);

    throw new Error(error.message);
  })