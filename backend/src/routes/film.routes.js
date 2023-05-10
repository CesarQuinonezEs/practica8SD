const {Router} = require('express');
const route = Router();
const {createFilm,deleteFilm,getAllFilms,getByImdbid} = require('../controller/film.controller')
route.get('/',getAllFilms);
route.post('/',createFilm);
route.delete('/:id',deleteFilm);
route.get('/:imdbid',getByImdbid);
module.exports = route;