import React from 'react';

const VideoTitle = ({ movie }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] md:pt-[20%] px-6 md:px-16 absolute text-white bg-linear-to-r from-black z-20">
      <h1 className="text-2xl md:text-5xl font-bold">{movie?.title}</h1>
      <p className="py-4 text-sm md:text-base w-full md:w-1/3 text-gray-200 line-clamp-3 pb-1">
        {movie?.overview}
      </p>
      <div className="my-2 md:my-4 flex items-center gap-3">
        <button className="bg-white text-black px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-semibold rounded-md hover:bg-gray-200 cursor-pointer transition">
          ▶{"  "}Play
        </button>
        <button className="bg-gray-600/70 text-white px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-semibold rounded-md hover:bg-gray-600/50 cursor-pointer transition">
         More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
