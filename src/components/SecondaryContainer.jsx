import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';

const SecondaryContainer = () => {
  // Getting movies data from store and passing it to MovieList component
  const movies = useSelector((store) => store.movies);
  const popularMovies = usePopularMovies();
  const topRatedMovies = useTopRatedMovies();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  if (!nowPlayingMovies || !popularMovies || !topRatedMovies) return <p>Loading movies...</p>;

  return (
    <div className="relative z-30 -mt-40">
      <MovieList
        title="Now Playing"
        movies={nowPlayingMovies.results}
      />

      <MovieList
        title="Popular Movies"
        movies={popularMovies.results}
      />

      <MovieList
        title="Top Rated Movies"
        movies={topRatedMovies.results}
      />
    </div>
  );
}

export default SecondaryContainer