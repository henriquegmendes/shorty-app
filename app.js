const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const appRoutes = require('./routes/appRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

mongoose.connect('mongodb://localhost/shorty-database', { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected with MongoDb Database'))
  .catch(error => {
    console.log(error);

    throw new Error('An error occured while trying to connect with MongoDb');
  });

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', appRoutes);
app.use('/', authRoutes);

app.listen(3000, () => console.log('App running on PORT 3000'));
