import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSigInForm] = useState(true);
  function toggleSignInForm() {
    setIsSigInForm(!isSignInForm);
  }
  return (
    <div className="relative">
      <Header />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
          className="absolute"
        />
        <form className=" w-3/12 absolute p-8 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign up"}
          </h1>
          {!isSignInForm &&
            <input
            type="text"
            placeholder="Full Name"
            className="w-full my-4 p-4 bg-gray-700"
          />
          }
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="w-full my-4 p-4 bg-gray-700"
          />
          
          <input
            type="text"
            placeholder="Password"
            className="w-full my-4 p-4 bg-gray-700"
          />
          <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
            {isSignInForm?"Sign In":"Sign up"}
          </button>
          <p>
            {isSignInForm ? "New to Netflix?" : "Already a user."}
            <span 
            className="cursor-pointer ml-3" onClick={toggleSignInForm}>
              {isSignInForm ? "Sign up Now." : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
