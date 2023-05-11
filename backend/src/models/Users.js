const {Schema, model,Types} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    username: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      rol:{
        type: Types.ObjectId,
        ref: "Role",
      }
});

userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

userSchema.statics.comparePassword = async (password,receivedPassword) =>{
    return await bcrypt.compare(password,receivedPassword);
}

module.exports = model("User",userSchema);