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
        const {imdbid,title,runtime,released,synopsis,ratingPoitns,ratingPeople,ratingAverage,imgurl} = req.body;
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
filmCtrl.editFilm = async(req,res)=>{
    try {
        const {imdbid,title,runtime,released,synopsis,ratingPoitns,ratingPeople,ratingAverage,imgurl} = req.body;
        const film = await Film.findByIdAndUpdate({_id:req.params.id},{imdbid,title,runtime,released,synopsis,rating,imgurl});
        res.status(200).json({message: "film edited"})
    } catch (error) {
        res.status(401).json({message: error});
    }
}
filmCtrl.rateFilm = async(req,res) =>{
    try{
        const {rate} = req.body;
        const film = await Film.findById(req.params.id);
        const peopleAux = film.ratingPeople + 1;
        const reating = film.ratingPoitns + rate;
        var newRateAvr = reating/peopleAux;
        const filmEdit = await Film.findByIdAndUpdate(req.params.id, {
            ratingPoitns: reating,
            ratingPeople: peopleAux,
            ratingAverage: newRateAvr
        });
        res.status(200).json({message:"success"});
    }catch(err){
        console.log(err);
        res.status(200).json({message: "Error"});
    }
}
module.exports = filmCtrl;