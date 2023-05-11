const {Schema, model,Types} = require('mongoose');
const roleSchema = Schema({
    name: String
}) 

module.exports = model('Role',roleSchema);