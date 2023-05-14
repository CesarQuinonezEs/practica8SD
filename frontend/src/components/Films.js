
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{ useContext } from 'react';
import { AppContext} from '../App'; 
import { useNavigate } from 'react-router-dom';

export default function Films(){
    const {movies,getFilmByImbdid,getGlogal} = useContext(AppContext);
    const navigate = useNavigate();
        return (
            <div className="h-100 d-flex justify-content-center align-items-cente bg-dark">
            <h1>
                Movies
            </h1><br/>
            <div className="row">
                
               {
                movies.map(film => ( 
                <div className="col-md-4" key={film._id}>
                    <div className="card mb-4" style={{ width: '18rem' }}> 
                        <Card.Img variant="top" src={film.imgurl} />
                        <div className="card-body">
                        <h5 className="card-title">{film.title}</h5>
                                
                               <button className='btn btn-primary' onClick={
                                async()=>{
                                    await getFilmByImbdid(film.imdbid);
                                    await getGlogal(film.imdbid);
                                    navigate("/review/"+film.imdbid);
                                    
                                }
                               }>Review</button>
                            </div>
                    </div>
                </div>
                ))
                }
            </div>
            
            </div>
        )
    }
