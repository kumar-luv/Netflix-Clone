import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import {
  toggleGptSearchView,
  removeGptMovieResult,
  removeOnToggleResult,
} from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const userName = user?.displayName;

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleSignOut = () => {
    dispatch(removeGptMovieResult());

    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  const handleGptSearchClick = () => {
    if (showGptSearch) {
      dispatch(removeGptMovieResult());
    } else {
      dispatch(toggleGptSearchView());
    }
  };

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleLanguageChange = (e) => {
    dispatch(removeOnToggleResult());
    dispatch(changeLanguage(e.target.value));
  };
  const handleHome = () => {
    dispatch(removeGptMovieResult());
  }

  return (
    <div className=" w-full px-8 py-2 bg-gradient-to-b from-black  flex flex-col md:flex-row justify-between absolute z-20">
      <div className="flex items-center">
        <img className="w-28 mx-3 py-2 md:w-52 md:mx-0" src={LOGO} alt="logo" />
        <div>
          {user && (
            <ul className="gap-6 ml-4 text-white text-sm hidden md:flex cursor-pointer text-left z-50" onClick={handleHome}>
              <Link to="/">Home</Link>
              <Link to="/">TV Shows</Link>
              <Link to="/">Movies</Link>
              <Link to="/">Web series</Link>
            </ul>
          )}
        </div>
      </div>

      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="inline-block p-2 m-2 mx-0 h-9 my-2 bg-gray-700 text-white rounded-lg hover:bg-slate-500 hover:cursor-pointer"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-gray-700 px-2  md:px-4 mx-2 md:mx-3 md:my-2 mt-3 h-8 md:h-9 text-white  hover:bg-slate-500 text-sm font-semibold rounded-md md"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="w-7 md:w-9  mt-3 md:mt-2 h-7 md:h-9 cursor-pointer rounded-md"
            alt="usericon"
            src={USER_AVATAR}
            onClick={toggleDropDown}
          />
          {isDropDownOpen && (
            <div className="absolute bg-gray-800 text-gray-300  mt-11 md:mt-12 w-30 md:w-40 hover:cursor-pointer  right-10 md:right-10 p-2 rounded-lg shadow-lg ">
              <ul className="list-none p-0">
                <li className="text-sm py-1 md:py-2 px-2 md:px-2 border-b border-gray-600">
                  Hello {userName}
                </li>
                <li className="text-sm py-1 md:py-2 px-2 border-b border-gray-600">
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Header;
