require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const filmsRoute = require('./routes/film.routes');
const roleRoute = require('./routes/role.routes');
const userRoute = require('./routes/users.routes');
const authRoute = require('./routes/auth.routes');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const optionSwagger = require('./swagger');
// settings
app.set('port', process.env.PORT || 4000); 
// middlewares
app.use(cors());
app.use(express.json())

//routes
app.use('/api/doc',swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(optionSwagger)));
app.use('/api/films',filmsRoute);
app.use('/api/role',roleRoute);
app.use('/api/user',userRoute);
app.use('/api',authRoute);
module.exports = app;