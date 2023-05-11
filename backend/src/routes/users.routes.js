const {Router} = require('express');
const route = Router();
const {createUser,deleteUser,getAllUser,getUserById} = require('../controller/users.controller');
const {isAdmin,verifyToken}= require('../middleware/authJWT')
route.get('/',[verifyToken,isAdmin],getAllUser);
route.post('/',[verifyToken,isAdmin],createUser);
route.get('/:id',[verifyToken,isAdmin],getUserById);
route.delete('/:id',[verifyToken,isAdmin],deleteUser);

module.exports = route;