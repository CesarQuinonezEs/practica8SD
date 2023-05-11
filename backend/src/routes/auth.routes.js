const {Router} = require('express');
const route = Router();
const {login,singup} = require('../controller/auth.controller');
/** 
 * @swagger
 * /api/login:
 *  post:
 *    summary: Login to api 
 *    tags: [Login]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: new user username
 *              password:
 *                type: string
 *                description: new user password
 *            required:
 *             - username
 *             - password
 *            example:
 *              username: userExample
 *              password: passwdExample
 *    responses:
 *      200:
 *        description: get an user token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token: 
 *                  type: String
 *                  description: user token
*/
route.post('/login',login);

/** 
 * @swagger
 * /api/singip:
 *  post:
 *    summary: Create a new user 
 *    tags: [Singup]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: new user username
 *              password:
 *                type: string
 *                description: new user password
 *            required:
 *             - username
 *             - password
 *            example:
 *              username: userExample
 *              password: passwdExample
 *    responses:
 *      200:
 *        description: new user created
*/
route.post('/singup',singup);

module.exports = route;