const {Schema, model,Types} = require('mongoose');
const filmSchema = new Schema({
    imdbid: String,
    title: String,
    runtime: String,
    released: String,
    synopsis: String,
    ratingPoitns: Number,
    ratingPeople: Number,
    ratingAverage: Schema.Types.Decimal128,
    imgurl: String
});
module.exports = model('Film',filmSchema);
