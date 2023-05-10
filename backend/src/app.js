require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const filmsRoute = require('./routes/film.routes');

// settings
app.set('port', process.env.PORT || 4000); 
// middlewares
app.use(cors());
app.use(express.json())
//routes
app.use('/api/films',filmsRoute);
module.exports = app;