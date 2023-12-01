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
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSigInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

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
          const user = userCredential.user;
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
          src={BG_URL}
          alt="logo"
          className="absolute w-full h-screen object-cover"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-72 mt-20 md:w-3/12 absolute p-8 bg-black my-24 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-md"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full my-2 p-1 md:my-4 md:p-4 bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email or Phone Number"
            className="w-full my-2 p-1 md:my-4 md:p-4 bg-gray-700"
          />

          <input
            ref={password}
            type="text"
            placeholder="Password"
            className="w-full my-2 p-1 md:my-4 md:p-4 bg-gray-700"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button
            onClick={handleButtonClick}
            className="md:p-4 my-2 p-1 md:my-6 bg-red-700 w-full rounded-lg"
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
