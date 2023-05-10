const mongoose = require('mongoose');
const{db} = require('./config');

const uri = 'mongodb+srv://quinonezcesar:5IS7AP09ox6fkkAI@practica8.nlmf11y.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri).then(db => console.log('db is conected')).catch(err => console.log(err));

module.exports = mongoose;