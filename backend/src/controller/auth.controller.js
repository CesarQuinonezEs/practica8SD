const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Role = require('../models/Roles');

const authCtrl = {};

authCtrl.singup = async (req,res) =>{
    try {
        const {username,password,} = req.body;
        const isUser = await User.findOne({username: username});
        if(isUser){
            res.status(401).json({message: "Username already use!!"});
            return;
        }
        const roleAux = await Role.findOne({name:"user"});
        console.log(roleAux._id);
        const rol = roleAux._id;
        console.log(rol);
        const newUser = new User({username,password,rol});
        newUser.password = await User.encryptPassword(newUser.password);
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
}

authCtrl.login = async(req,res) =>{
    try {
        const userFound = await User.findOne({username: req.body.username});
        if(!userFound) return res.status(401).json({message: "User not found"});
        const matchPasswd  = await User.comparePassword(req.body.password,userFound.password);
        if(!matchPasswd)
            return res.status(401).json({
                token: null,
                message: "Invalid password"
            });
        
        const token = jwt.sign({id: userFound._id},"SECRET",{
            expiresIn: 86400,
        });
        res.status(200).json({token});
    } catch (error) {
        console.log(error);
    }
}

module.exports = authCtrl;