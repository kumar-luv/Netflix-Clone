import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-36 md:w-64 md:h-40 pr-4 hover:cursor-pointer transition-transform duration-500 transform hover:scale-150 hover:z-10">
      <img className="w-full h-full " alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;