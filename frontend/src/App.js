
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Films from './components/Films';
import React, { createContext, useRef, useEffect, useState } from 'react';
//import Navigation from './components/navigation';
import Navigation from './components/navigation';
import Review from './components/Review';
const FILMS_URI = 'https://practica8sdbackend.onrender.com/api/films/';

export const AppContext = createContext(null);

function App() {
  const [user,setUser] = useState(null);
  const [film,setfilm] = useState();
  const [movies, setmovies] = useState([]);
  const [global,setGlobal] = useState(); 
  const [cant,setCant] = useState();
  //function 
  useEffect(() => {
    getFilms();

  }, [])

  const getGlogal = async (imdbid) =>{
    console.log(imdbid);
    var aux =0;
    var sum = 0;
    try{
    const frank = await axios.get('https://movies-backend-1nuf.onrender.com/api/movies/rate/'+imdbid);
    
    aux = aux + frank.data.rate;
    sum++;
    }catch(error){

    }
    //PONER ESTO EN PRODUCCION
   /* const cest = await axios.get('http://distributed-systems-movies.sanchezcarlosjr.repl.co/movies/'+imdbid);
    console.log(cest);
    aux = aux + cest.data.imdbrating;*/
    try{
    const jorge = await axios.get('https://moviesapp-api.onrender.com/api/movies/rating/'+imdbid);
    aux =  aux + parseInt(jorge.data.finalRating);
    sum++;
    }catch(error){}
    try{
    const edgar = await axios.get('https://pelisapi-production.up.railway.app/api/reviews/movie/'+imdbid);
    aux = aux + Math.round(edgar.data.avgScore);
    sum++;
    }catch(error){

    }
    try{
    const carlo = await axios.get('https://carlo-backend-pelis.onrender.com/api/movies/+imdbid'+imdbid);
  
    aux = aux + carlo.data.rating ;
    sum++
    }catch{

    }
    setCant(sum+1);
    setGlobal(aux);
  }
  const getFilmByImbdid = async (imdbid) =>{
    console.log(`Nose: ${imdbid}`);
    const res = await axios.get(FILMS_URI+imdbid).then(res => setfilm(res.data))
  }
  const getFilms = async () => {
    const res = await axios.get(FILMS_URI).then(res => setmovies(res.data));
    
  }
  return (
    <AppContext.Provider value={{ movies,getFilmByImbdid,film,getGlogal,global,cant,user,setUser}}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Films />} />
            <Route path={"/review/:imdbid"} element={<Review/>}/>
          </Route>
          
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
