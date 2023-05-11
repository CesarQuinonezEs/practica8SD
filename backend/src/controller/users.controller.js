const userCtrl = {};
const User = require('../models/Users');
const Role = require('../models/Roles');


userCtrl.getAllUser = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users); 
    } catch (error) {
        res.status(401).json({message: "Server fail!!!"})
    }
}

userCtrl.createUser = async(req,res) =>{
    try {
        const {username,password,role} = req.body;
        const isUser = await User.findOne({username: username});
        if(isUser){
            res.status(401).json({message: "Username already use!!"});
            return;
        }
        const roleAux = await Role.findOne({name:role});
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
userCtrl.getUserById = async(req,res) => {
    try {
        const user = User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({message: "Server fail!!!"});
    }
}
userCtrl.deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "user deleted"});
    } catch (error) {
        res.status(401).json({message: "Server fail!!!"});
    }
}

module.exports = userCtrl;