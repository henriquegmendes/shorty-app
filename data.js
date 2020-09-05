const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost/shorty-database', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Conectado no banco de Dados!');

    const newUser = {
      fullName: 'Henrique',
      email: 'henrique@henrique.com.br',
      cpf: '368.191.598-97',
      password: '123456',
    };

    User.findByIdAndUpdate('5f518b811a7cf75320baf4fc', { $set: { fullName: 'Henrique Mendes' } })
      .then((user) => {
        console.log('usuário atualizado', user)

        mongoose.connection.close();
      });
  });

