const mongoose = require('mongoose');
const{db} = require('./config');

const uri = 'mongodb+srv://'+db.user+':'+db.passwd+'@practica8.nlmf11y.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri).then(db => console.log('db is conected')).catch(err => console.log(err));

module.exports = mongoose;