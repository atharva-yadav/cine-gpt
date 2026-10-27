import { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constants';

function useTopRatedMovies() {
    const [popularMovies, setpopularMovies] = useState(null);
    const getTopRatedMovies = async () => {
        const url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
        const data = await fetch(url, API_OPTIONS);
        setpopularMovies(await data.json());
        return popularMovies;
    };

    useEffect(() => {
        getTopRatedMovies();
    }, []);

    return popularMovies;
}

export default useTopRatedMovies