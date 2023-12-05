
import { useSelector } from "react-redux";
import { BG_URL } from "../utils/constants";

const MoviePage = () => {
  const trailer = useSelector((store) => store.trailer);

  const goBack = () => {
    window.history.back(); 
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={BG_URL}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex justify-center items-start">
        {trailer ? (
          <iframe
            className="w-full max-h-full aspect-w-16 h-60 md:h-full z-10"
            src={
              "https://www.youtube.com/embed/" +
              trailer?.key +
              "?&autoplay=1&mute=1"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        ) : (
          <div className="absolute inset-0 flex flex-col justify-center items-center z-20 bottom-80">
            <div className="bg-black rounded-lg p-4 md:w-1/2 md:text-center">
              <h1 className="text-white text-2xl font-semibold">
                Movie not found!!
              </h1>
            </div>
          </div>
        )}
      </div>
      {
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 md:top-4 md:left-15 hidden md:block">
          <button
            onClick={goBack}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
          >
            Go Back
          </button>
        </div>
      }
      {
        <div className="md:hidden absolute bottom-80 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={goBack}
            className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
          >
            Go Back
          </button>
        </div>
      }
    </div>
  );
};

export default MoviePage;
