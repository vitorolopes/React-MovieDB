import React, { useContext, useState, useEffect } from 'react';

// OMDb API usage
// Send all requests to 
// https://www.omdbapi.com/?apikey=[yourkey]&
// OMDb parameters
// s: Movie title to search for
// https://www.omdbapi.com/?apikey=[mykey]&s=matrix
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
// console.log(API_ENDPOINT);

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("Matrix");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState({msg: "", show: false })

    const fetchMovies = async (url) => {
        setIsLoading(true)
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            if(data.Response === "True"){
                setMovies(data.Search)
                setError({show:false,msg:""})
            } else{
                setError({show: true, msg:data.Error})
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
      fetchMovies(`${API_ENDPOINT}&s=${query}`)
    }, [query])
    



    return(
        <AppContext.Provider value={
            {isLoading, query, movies, error, setQuery} 
        }>
            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider} 