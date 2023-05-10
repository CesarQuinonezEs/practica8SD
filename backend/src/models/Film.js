const {Schema, model} = require('mongoose');
const filmSchema = new Schema({
    imdbid: String,
    title: String,
    runtime: String,
    released: String,
    synopsis: String,
    rating: Decimal128
});
module.exports = model('Film',filmSchema);