const filmCtrl = {};
const { model } = require('mongoose');
const Film = require('../models/Film');
filmCtrl.getAllFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (error) {
        res.status(401).json(error);
    }
}
filmCtrl.createFilm = async(req,res)=>{
    try {
        const {imdbid,title,runtime,released,synopsis,rating,imgurl} = req.body;
        const newFilm = new Film({imdbid,title,runtime,released,synopsis,rating,imgurl});
        console.log("Nueva pelicula: ", newFilm);
        await newFilm.save();
        res.status(200).json({message: 'Film Saved'});
    } catch (error) {
        res.status(401).json({message: error});
    }

}
filmCtrl.getByImdbid = async(req,res)=>{
    try {
        const film = await Film.findOne({imdbid: req.params.imdbid});
        res.json(film);
    } catch (error) {
        res.status(401).json({message: error})
    }
}
filmCtrl.deleteFilm = async(req,res)=>{
    try {
        await Film.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Film Deleted'});
    } catch (error) {
        res.status(401).json({message: error});
    }
}

module.exports = filmCtrl;