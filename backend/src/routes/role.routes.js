const {Router} = require('express');
const route = Router();
const {createRole,getAllRoles,getById,roleDelete,roleEdit} = require('../controller/role.controller');
const {isAdmin,verifyToken}= require('../middleware/authJWT');
/**
 * @swagger
 * components:
 *  schemas:
 *    Role:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: role name
 *      required:
 *        - name
 *      example:
 *        name: nameExample
*/

/** 
 * @swagger
 * /api/role/:
 *  get:
 *    summary: return roles in the db (only admin)
 *    tags: [Role]
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
 *    responses:
 *      200:
 *        description: get all roles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Role'
*/
route.get('/',[verifyToken,isAdmin],getAllRoles);
/** 
 * @swagger
 * /api/role/:
 *  post:
 *    summary: create a role (only admin)
 *    tags: [Role]
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
 *            $ref: '#/components/schemas/Role'
 *    responses:
 *      200:
 *        description: return a success message
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: String
 *                  description: role created!!
 *              example:
 *                message: role created!!
*/

route.post('/',[verifyToken,isAdmin],createRole);

/** 
 * @swagger
 * /api/role/:id:
 *  get:
 *    summary: return role by id (only admin)
 *    tags: [Role]
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
 *        description: role _id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: String
 *                  description: role id
 *    responses:
 *      200:
 *        description: get a role
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Role'
*/
route.get('/:id',[verifyToken,isAdmin],getById);

/** 
 * @swagger
 * /api/role/:
 *  put:
 *    summary: edit a role (only admin)
 *    tags: [Role] 
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
 *        description: role _id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: String
 *                  description: role id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema: 
 *            type: oject
 *            $ref: '#/components/schemas/Role'
 *    responses:
 *      200:
 *        description: return menssage
 *        content:
 *          application/json:
 *            schema:
 *              message:
 *                  type: String
 *                  description: role edited!!
 *              example:
 *                message: role edited!!      
*/
route.put('/:id',[verifyToken,isAdmin],roleEdit);
/** 
 * @swagger
 * /api/role/:id:
 *  delete:
 *    summary: delete a role in the db(only admin)
 *    tags: [Role]
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
 *        description: role _id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id: 
 *                  type: String
 *                  description: role id
 *    responses:
 *      200:
 *        description: get a message 
 *        content:
 *          application/json:
 *            schema:
 *              message:
 *                  type: String
 *                  description: role deleted!!
 *              example:
 *                message: role deleted!!
*/
route.delete('/:id',[verifyToken,isAdmin],roleDelete);
module.exports = route;
