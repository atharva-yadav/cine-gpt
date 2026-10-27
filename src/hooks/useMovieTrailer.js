import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../utils/constants';

function useMovieTrailer(movie) {

    const [trailerYTVideokey, setTrailerYTVideokey] = useState(null);

    const { id } = movie;

    const getMovieVideos = async (movieId) => {

        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const data = await fetch(url, API_OPTIONS);
        const jsonData = await data.json();

        console.log("JSONDATA:", jsonData)

        const filteredTrailers = jsonData.results.filter((video) => {
        return video.type == "Trailer"
        });

        const trailer = filteredTrailers.length ? filteredTrailers[0] : jsonData[0];
        const trailerYTVideokey = trailer.key;
        setTrailerYTVideokey(trailerYTVideokey);
        // const YTUrl = `https://www.youtube.com/watch?v=${trailerYTVideokey}`
        console.log(trailer);
        return trailerYTVideokey;
    };


    useEffect(() => {
        getMovieVideos(id);
    }, []);

    return trailerYTVideokey;
}

export default useMovieTrailer