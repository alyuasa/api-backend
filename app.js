const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/users');
const pilotRoutes = require('./routes/corredores');
const lapRoutes = require('./routes/voltas');
const dashRoutes = require('./routes/dashboard');

app.use('/usuarios', userRoutes);
app.use('/corredores', pilotRoutes);
app.use('/voltas', lapRoutes);
app.use('/dashboard', dashRoutes);

module.exports = app;