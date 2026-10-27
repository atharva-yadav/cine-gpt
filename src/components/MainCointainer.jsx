import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainCointainer = () => {
  const moviesList = useSelector((store) => store.movies?.nowPlayingMovies);
  console.log("moviesList", moviesList);
  if(!moviesList) return;
  const mainMovie = moviesList.results[Math.floor(Math.random() * moviesList.results.length)];

  return (
    <div className="relative">
      {/* Top gradient overlay to seamlessly blend header into the video background */}
      <div className="absolute top-0 left-0 w-full h-44 md:h-72 bg-linear-to-b from-black via-black/60 to-transparent z-10 pointer-events-none"></div>
      <VideoTitle movie={mainMovie} />
      <VideoBackground movie={mainMovie} />
    </div>
  );
}

export default MainCointainer