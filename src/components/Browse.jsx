import Header from "./Header"
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainCointainer from "./MainCointainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();
  
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <div>
        <MainCointainer />
        <SecondaryContainer />
      </div>
    </div>
  );
};

export default Browse
