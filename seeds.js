const mongoose = require('mongoose');
const User = require('./models/User');

const user = {
  fullName: 'Henrique',
  email: 'henrique@henrique.com.br',
  cpf: '123.456.789.00',
  password: '123456',
}

mongoose.connect('mongodb://localhost/shorty-database', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(async () => {
    await User.create(user);

    mongoose.connection.close();
  })
  .catch(error => {
    console.log(error);

    throw new Error('An error occured while trying to connect with MongoDb');
  });