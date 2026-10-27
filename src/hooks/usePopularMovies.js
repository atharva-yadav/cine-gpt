import { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constants';

function usePopularMovies() {

    const [popularMovies, setpopularMovies] = useState(null);
    const getPopularMovies = async (movieId) => {

        const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
        const data = await fetch(url, API_OPTIONS);
        const jsonData = await data.json();

        // console.log("JSONDATA:", jsonData)

        const popularMovies = jsonData;
        setpopularMovies(popularMovies);
        console.log("popular - ", popularMovies);
        return popularMovies;
    };


    useEffect(() => {
        getPopularMovies();
    }, []);

    return popularMovies;
}

export default usePopularMovies