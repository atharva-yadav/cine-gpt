import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movie }) => {
  const trailerYTVideokey = useMovieTrailer(movie);

  if (!trailerYTVideokey) {
    return <div className="w-screen aspect-video bg-black"></div>;
  }

  return (
    <div className="w-screen aspect-video overflow-hidden pointer-events-none">
      <iframe 
        className="w-screen aspect-video border-none scale-125 md:scale-135 pointer-events-none"
        id="ytplayer" 
        title="Movie Trailer"
        src={`https://www.youtube.com/embed/${trailerYTVideokey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerYTVideokey}&cc_load_policy=0&iv_load_policy=3&modestbranding=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
