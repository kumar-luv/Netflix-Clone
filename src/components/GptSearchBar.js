import openai from "../utils/openai";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, removeOnToggleResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    setLoading(true);
    // Make an API call to GPT API and get Movie Results

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      <p className="text-white font-bold text-3xl">No such Movies Found</p>;
    }

    // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    setLoading(false);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  const handleMovies = () => {
    dispatch(removeOnToggleResult());
  }

  return (
    <div className="pt-[70%] md:pt-[10%] flex justify-center ">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceholder}
          onChange={handleMovies}
        />
        <button
          className="col-span-3 m-4 py-2 px-2 md:px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {loading && (
            <div className="fixed top-1/2 md:top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center space-x-2">
                <div className="w-16 h-16 relative">
                  <div className="w-full h-full border-t-4 border-r-4 border-b-4 border-red-500 rounded-full animate-spin absolute top-0 left-0"></div>
                  <div className="w-full h-full border-t-4 border-r-4 border-b-4 border-transparent rounded-full animate-spin absolute top-0 left-0 animate-reverse"></div>
                </div>
                <div className="text-red-500 text-xl font-semibold">
                  Loading...
                </div>
              </div>
            </div>
          )}
          {!loading && lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
