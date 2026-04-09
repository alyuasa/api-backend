const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/users');
const pilotRoutes = require('./routes/corredores');
const lapRoutes = require('./routes/voltas');

app.use('/usuarios', userRoutes);
app.use('/corredores', pilotRoutes);
app.use('/voltas', lapRoutes);

module.exports = app;