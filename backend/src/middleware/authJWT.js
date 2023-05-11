const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Role = require('../models/Roles');
const authCtrl = {};

authCtrl.verifyToken = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: "Acceso denegado, haz login"});
    try {
        const decoded =jwt.verify(token, "SECRET");
        req.userId = decoded.id;
        const user = await User.findById(req.userId,{password: 0});
        if (!user) return res.status(404).json({ message: "No user found" });
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json({error: "token invalido"})
    }
}
authCtrl.isAdmin = async(req,res,next) =>{
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.findById(user.rol);
        if(roles.name == "admin"){
            next();
            return;
        }
        return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}

module.exports = authCtrl;