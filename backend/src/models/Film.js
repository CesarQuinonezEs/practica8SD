const {Schema, model,Types} = require('mongoose');
const filmSchema = new Schema({
    imdbid: String,
    title: String,
    runtime: String,
    released: String,
    synopsis: String,
    rating: {type: Types.Decimal128},
    imgurl: String
});
module.exports = model('Film',filmSchema);