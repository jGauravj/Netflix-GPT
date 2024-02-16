import useNowPlayingMovies from "../CustomHooks/useNowPlayingMovies";
import MainContainer from "../mainCotainer/MainContainer";
import SecondryContainer from "../secondaryContainer/SecondryContainer";
import Header from "./Header";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondryContainer />
    </div>
  );
};

export default Browse;
