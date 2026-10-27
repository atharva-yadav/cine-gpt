import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({ movie }) => {
  const hasRating = Number.isFinite(movie.vote_average) && movie.vote_average > 0

  return (
    <article className="group w-36 flex-none overflow-hidden rounded-lg bg-zinc-900 text-white transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 sm:w-44">
      <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
        {movie.poster_path ? (
          <img
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            src={IMG_CDN_URL + movie.poster_path}
            alt={`${movie.title} poster`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-3 text-center text-sm text-zinc-400">
            Poster unavailable
          </div>
        )}
      </div>

      <div className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            {movie.title}
          </h3>
          {hasRating && (
            <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 text-xs font-medium text-amber-300">
              {movie.vote_average.toFixed(1)}
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
          {movie.overview}
        </p>
      </div>
    </article>
  )
}

export default MovieCard