import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES ,USER_AVATAR} from "../utils/constants";
import { auth } from "../utils/firebase";
import { removeUser,addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
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


  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44  mx-auto md:mx-0" src={LOGO} alt="logo" />
      
        {user && (<div className="flex p-2 justify-between">
          {(
            <select
              className="p-2 m-2 bg-gray-900 text-white rounded-md"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <img
            className="hidden md:block w-10 h-10 mt-2 rounded-md"
            alt="usericon"
            src={USER_AVATAR}
          />
          <button onClick={handleSignOut} className="font-bold text-white ml-1">
            Sign Out
          </button>
        </div>)}
      
    </div>
  );
};
export default Header;