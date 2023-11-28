import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSigInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const errorParts = errorCode.split("/");
          const finalError = errorParts[1];
          setErrorMessage(finalError);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  
                })
              );
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const errorParts = errorCode.split("/");
          const finalError = errorParts[1];
          setErrorMessage(finalError);
        });
    }
  };

  function toggleSignInForm() {
    setIsSigInForm(!isSignInForm);
  }
  return (
    <div className="relative w-full ">
      <Header />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
          className="absolute w-full"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" w-3/12 absolute p-8 bg-black my-24 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full my-4 p-4 bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or Phone Number"
            className="w-full my-4 p-4 bg-gray-700"
          />

          <input
            ref={password}
            type="text"
            placeholder="Password"
            className="w-full my-4 p-4 bg-gray-700"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button
            onClick={handleButtonClick}
            className="p-4 my-6 bg-red-700 w-full rounded-lg"
          >
            {isSignInForm ? "Sign In" : "Sign up"}
          </button>
          <p>
            {isSignInForm ? "New to Netflix?" : "Already a user."}
            <span className="cursor-pointer ml-3" onClick={toggleSignInForm}>
              {isSignInForm ? "Sign up Now." : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
