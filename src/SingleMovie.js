import React, {useState, useEffect} from 'react';
import {API_ENDPOINT} from './context';
import {useParams, Link} from 'react-router-dom'

const SingleMovie = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({})
  const [error, setError] = useState({show: false, msg:""})

  const {id} = useParams();
 
  const fetchMovies = async (url) => {
    setIsLoading(true)
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if(data.Response === "False"){
          setError({show: true, msg: data.Error})
          setIsLoading(false)
        } else{
           setMovie(data)
           setIsLoading(false)
        }
       
    } catch (error) {
        console.log(error);
    }  
  }

  useEffect(() => {   
    fetchMovies(`${API_ENDPOINT}&i=${id}`)
  }, [id])
  
 if(isLoading){
   return(<div className='loading'></div>)
 }

  if(error.show){
    return(
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className='btn'>
          back to movies
        </Link>
      </div>
    )
  }

  const {Poster: poster, Title: title, Plot: plot, Year: year  } = movie

  return (
    <section className='single-movie'>
      <img src={poster} alt={title} />
      <div>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className='btn'>
          back to movies
        </Link>
      </div>
    </section>
  )
}

export default SingleMovie