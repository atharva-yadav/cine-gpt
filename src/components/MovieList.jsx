import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
  return (
    <section className="px-5 py-6">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieList