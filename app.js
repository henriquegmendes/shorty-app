const express = require('express');
const hbs = require('hbs');
const path = require('path');

const loggedAreaRoutes = require('./routes/loggedAreaRoutes');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use('/dashboard', loggedAreaRoutes);

app.listen(3003, () => console.log('🏃‍ on port 3000'));