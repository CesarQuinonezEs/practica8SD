const roleCtrl = {};
const Role = require('../models/Roles');

roleCtrl.getAllRoles = async (req,res)=>{
    try {
        console.log("llegue a get");
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(401).json( error);
    }
}
roleCtrl.createRole = async(req,res) =>{
    try {
        const {name} = req.body;
        const newRole = new Role({name});
        await newRole.save();
        res.status(200).json({message: 'Role Saved'});
    } catch (error) {
        res.status(401).json({message: error});
    }
}
roleCtrl.getById = async(req,res) =>{
    try{
        const rol = await Role.findById(req.params.id);
        res.status(200).json(rol);
    }catch(err){
        res.status(401).json({message: error});
    }
}
roleCtrl.roleEdit = async(req,res) =>{
    try{
        const {name} = req.body;
        const rol = await Role.findByIdAndUpdate({_id:req.params.id},{name});
        res.status(200).json(rol);
    }catch(err){
        res.status(401).json({message: error});
    }
}
roleCtrl.roleDelete = async(req,res)=>{
    try {
        await Role.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Role deleted"});
    } catch (error) {
        res.status(401).json({message: error});
    }
}

module.exports = roleCtrl;