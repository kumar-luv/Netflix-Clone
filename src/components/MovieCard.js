import { IMG_CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { addTrailer, removeTrailer } from "../utils/cardSlice";
const MovieCard = ({ posterPath, movieId }) => {
  const dispatch = useDispatch();
  let newTrailer;
  const navigate = useNavigate();
  if (!posterPath) return null;
  const changeTrailerVideo = async (movieId) => {
    dispatch(removeTrailer());
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    newTrailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailer(newTrailer));
    navigate("/movie");
  };
  return (
    <div
      className="w-36 md:w-64 md:h-40 pr-4 hover:cursor-pointer transition-transform duration-500 transform hover:scale-150 hover:z-10"
      onClick={() => changeTrailerVideo(movieId)}
    >
      <img
        className="w-full h-full "
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};
export default MovieCard;
