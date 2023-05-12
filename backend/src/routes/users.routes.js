const {Router} = require('express');
const route = Router();
const {createUser,deleteUser,getAllUser,getUserById} = require('../controller/users.controller');
const {isAdmin,verifyToken}= require('../middleware/authJWT')
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: new user username
 *        password:
 *          type: string
 *          description: new user password
 *        rol:
 *          type: ObjectId
 *          description: Reference to Role _id
 *      required:
 *        - username
 *        - password
 *        - rol
 *      example:
 *        username: userExample
 *        password: passwdExample
 *        rol: roleIdExample
*/

/** 
 * @swagger
 * /api/user/:
 *  get:
 *    summary: return users in the db (only admin)
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: X-API-Key
 *        required: true
 *        description: you need be admin to access
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get all user
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/User'
*/
route.get('/',[verifyToken,isAdmin],getAllUser);
/** 
 * @swagger
 * /api/user/:
 *  post:
 *    summary: create a user (only admin)
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: X-API-Key
 *        required: true
 *        description: you need be admin to access
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            type: oject
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: get an user token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: String
 *                  description: user created!!
 *              example:
 *                message: user created!!
*/
route.post('/',[verifyToken,isAdmin],createUser);
/** 
 * @swagger
 * /api/user/:id:
 *  get:
 *    summary: return user by id (only admin)
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: X-API-Key
 *        required: true
 *        description: you need be admin to access
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: user id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get an user 
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/User'
*/
route.get('/:id',[verifyToken,isAdmin],getUserById);
/** 
 * @swagger
 * /api/user/:
 *  delete:
 *    summary: delete a user in the db(only admin)
 *    tags: [User]
 *    parameters:
 *      - in: header
 *        name: X-API-Key
 *        required: true
 *        description: you need be admin to access
 *        schema:
 *          type: string
 *      - in: path
 *        name: id
 *        required: true
 *        description: user id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: deleted an user 
 *        content:
 *          application/json:
 *            schema:
 *              message:
 *                  type: String
 *                  description: user deleted!!
 *              example:
 *                message: user deleted!!'
*/
route.delete('/:id',[verifyToken,isAdmin],deleteUser);

module.exports = route;