const {Router} = require('express');
const route = Router();
const {login,singup} = require('../controller/auth.controller');

route.post('/login',login);
route.post('/singup',singup);

module.exports = route;