import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext, useEffect,useState } from 'react';
import { AppContext } from '../App';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import axios from 'axios';
const FILMS_URI = 'https://practica8sdbackend.onrender.com/api/films/';
export default function Review() {
  const { film, global, cant, user } = useContext(AppContext);
  const [value, setValue] = React.useState(0);
  const onChangeStart = async (event,newValue) => {
    if(!user){
      alert("Inicia sesion")
    }else{
    try {
      const res = await axios.put(FILMS_URI+'rate/'+film._id,{
        rate:newValue
      },{headers:{
        'X-API-Key':user.token
      }})
      setValue(newValue);
      console.log(newValue);
      alert("succes!")
    } catch (error) {
      alert("error",error);
    }
    
  }

  }

  const calf = 0.5 * Math.round(film.ratingAverage.$numberDecimal);

  const auxGlobal = Math.round(((global + calf)) / cant);
  return (
    <div className=' bg-dark'>
      <div className="row">
        <div className="col-lg-8">
          <h2 className='text-light'>{film.title}</h2>
          <img src={film.imgurl} />
          <p className="lead text-light text-light">{film.synopsis}</p>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Información de la Película</h5>
              <ul className="list-group list-group-flush">

                <li className="list-group-itemt"><strong>Año:</strong> {film.released}</li>
                <li className="list-group-item "><strong>Duración:</strong> {film.runtime}</li>
                <li className='list-group-item'><Typography component="legend">Calificacion: {calf}</Typography>
                  <Rating name="read-only" value={calf} precision={0.5} readOnly /></li>
                <li className='list-group-item'><Typography component="legend">Calificacion global: {auxGlobal}</Typography>
                  <Rating name="read-only" value={auxGlobal} precision={0.5} readOnly /></li>
                <li className='list-group-item'>
                  <Typography component="legend" >Ponle tu Calificacion </Typography>
                  <Rating name="ratingUser" value={value} precision={0.5}  onChange={onChangeStart}/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}