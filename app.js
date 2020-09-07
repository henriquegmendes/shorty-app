const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

const loggedAreaRoutes = require('./routes/loggedAreaRoutes');

require('./database/mongodb');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use('/', loggedAreaRoutes);

app.listen(3000, () => console.log('🏃‍ on port 3000'));