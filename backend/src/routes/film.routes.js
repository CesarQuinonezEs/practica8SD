const {Router} = require('express');
const route = Router();
const {createFilm,deleteFilm,getAllFilms,getByImdbid,editFilm} = require('../controller/film.controller')
const {isAdmin, verifyToken}= require('../middleware/authJWT')
/**
 * @swagger
 * components:
 *  schemas:
 *    Film:
 *      type: object
 *      properties:
 *        imdbid:
 *          type: string
 *          description: new user username
 *        title:
 *          type: string
 *          description: film title
 *        runtime:
 *          type: string
 *          description: film runtime
 *        released:
 *          type: string
 *          description: film released
 *        synopsis:
 *          type: string
 *          description: film synopsis
 *        ratingPoitns:
 *          type: number
 *          description: film ratingPoitns
 *        ratingPeople:
 *          type: number
 *          description: film ratingPeople
 *        ratingAverage:
 *          type: number
 *          description: film rating average
 *        imgurl:
 *          type: string
 *          description: film img url
 *      required:
 *        - imdbid
 *        - title
 *        - runtime
 *        - released
 *        - synopsis
 *        - ratingPoitns
 *        - ratingPeople
 *        - ratingAverage
 *        - imgurl
 *      example:
 *        username: userExample
 *        password: passwdExample
 *        rol: roleIdExample
*/
/** 
 * @swagger
 * /api/films/:
 *  get:
 *    summary: return all films in the db 
 *    tags: [Film]
 *    responses:
 *      200:
 *        description: get all films
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Film'
*/

route.get('/',getAllFilms);

/** 
 * @swagger
 * /api/films/:
 *  post:
 *    summary: create a film (only admin)
 *    tags: [Film]
 *    parameters:
 *      - in: header
 *        name: X-API-Key
 *        required: true
 *        description: you need be admin to access
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token: 
 *                  type: String
 *                  description: user token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            type: oject
 *            $ref: '#/components/schemas/Film'
 *    responses:
 *      200:
 *        description: get message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: String
 *                  description: Film created!!
 *              example:
 *                message: Film created!!
*/
route.post('/',[verifyToken,isAdmin],createFilm);
/** 
 * @swagger
 * /api/films/:
 *  delete:
 *    summary: delete a film (only admin)
 *    tags: [Film]
 *    parameters:
 *      - in: header
 *        name: X-API-Key
 *        required: true
 *        description: you need be admin to access
 *        schema:
 *          type: string
 *      - in: path
 *        name: imdbid
 *        required: true
 *        description: film imdbid
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get a message
 *        content:
 *          application/json:
 *            schema:
 *              message:
 *                  type: String
 *                  description: film deleted!!
 *              example:
 *                message: film deleted!!'
*/
route.delete('/:id',[verifyToken,isAdmin],deleteFilm);
/** 
 * @swagger
 * /api/films/{imdbid}:
 *  get:
 *    summary: return user by  imdbid
 *    tags: [Film]
 *    parameters:
 *      - in: path
 *        name: imdbid
 *        required: true
 *        description: film imdbid
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get an user 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Film'
*/
route.get('/:imdbid',getByImdbid);
/** 
 * @swagger
 * /api/films/:
 *  put:
 *    summary: edit a fil (only admin)
 *    tags: [Film] 
 *    parameters:
 *      - in: header
 *        name: X-API-Key
 *        required: true
 *        description: you need be admin to access
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token: 
 *                  type: String
 *                  description: user token
 *      - in: path
 *        name: id
 *        required: true
 *        description: film _id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: String
 *                  description: film id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            type: oject
 *            $ref: '#/components/schemas/Film'
 *    responses:
 *      200:
 *        description: return menssage
 *        content:
 *          application/json:
 *            schema:
 *              message:
 *                  type: String
 *                  description: film edited!!
 *              example:
 *                message: film edited!!      
*/
route.put('/:id',[verifyToken,isAdmin],editFilm)
module.exports = route;