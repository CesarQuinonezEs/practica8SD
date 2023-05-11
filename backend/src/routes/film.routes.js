const {Router} = require('express');
const route = Router();
const {createFilm,deleteFilm,getAllFilms,getByImdbid} = require('../controller/film.controller')
const {isAdmin, verifyToken}= require('../middleware/authJWT')
route.get('/',getAllFilms);
route.post('/',[verifyToken,isAdmin],createFilm);
route.delete('/:id',[verifyToken,isAdmin],deleteFilm);
route.get('/:imdbid',getByImdbid);
module.exports = route;