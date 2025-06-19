const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

//Sikkerhed: tillader kun en specifik origin ad gangen at tilgå backend.
const corsOptions = {
  origin: process.env.ENVIROMENT === 'production'
    ? 'https://minut-rens.dk'
    : 'http://localhost:8080'
};

app.use(cors(corsOptions));
app.use(express.json());

//Alle endpoints
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/services', serviceRoutes);
app.use('/users', userRoutes);

module.exports = app;