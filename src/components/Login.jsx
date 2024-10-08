import React, { useState, useRef } from "react";
import qrCode from "../assets/frame.png";
import { validateInput } from "../utils/validateInput";
import { userSignIn, userSignUp } from "../utils/firebaseAuth";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [error, setError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignIn = async () => {
    const message = validateInput(email.current.value, password.current.value);

    if (message) {
      setError(message);
      return;
    }

    if (message === null) {
      try {
        await userSignIn(email.current.value, password.current.value);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleSignUp = async () => {
    const message = validateInput(email.current.value, password.current.value);

    if (message) {
      setError(message);
      return;
    }

    if (message === null) {
      try {
        await userSignUp(email.current.value, password.current.value);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex bg-white w-1/2 h-full items-center justify-center">
        <div className="flex flex-col bg-white w-96 px-20 py-5 shadow-lg rounded-3xl items-center">
          <h3 className="text-2xl font-bold my-2 text-center">InstaFood</h3>
          <img src={qrCode} className="w-150 h-120 my-2" />
          <p className="font-semibold text-lg my-2">Get our InstaFood App</p>
          <p className="text-center text-gray-600">
            Manage all your orders from your mobile
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/2 h-full bg-green-300">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white w-96 px-10 py-5 shadow-lg rounded-3xl flex flex-col"
        >
          <h3 className="text-2xl font-semibold my-5">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h3>
          {!isSignInForm && (
            <input
              type="text"
              ref={name}
              placeholder="Name"
              className="my-2 bg-slate-100 bg-opacity-80 px-3 py-2 rounded-lg shadow-xl"
            />
          )}
          <input
            type="text"
            ref={email}
            placeholder="Email"
            className="my-2 bg-slate-100 bg-opacity-80 px-3 py-2 rounded-lg shadow-xl"
          />
          <input
            type={isPassVisible ? "text" : "password"}
            ref={password}
            placeholder="Password"
            className="my-2 bg-slate-100 bg-opacity-80 px-3 py-2 rounded-lg shadow-xl"
          />
          <div className="flex flex-row align-middle my-2">
            <input
              type="checkbox"
              className="mr-2"
              onClick={() => setIsPassVisible(!isPassVisible)}
            />
            <p>Show Password</p>
          </div>
          <p className="text-red-500">{error}</p>
          {isSignInForm ? (
            <button
              onClick={handleSignIn}
              className="my-2 bg-green-300 py-2 rounded-lg shadow-xl"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="my-2 bg-green-300 py-2 rounded-lg shadow-xl"
            >
              Sign Up
            </button>
          )}
          {isSignInForm ? (
            <p
              onClick={() => setIsSignInForm(false)}
              className="my-1 text-center"
            >
              New to InstaFood?{" "}
              <strong className="text-green-400">Sign Up</strong>
            </p>
          ) : (
            <p className="my-1 text-center">
              Already have an account?{" "}
              <strong
                onClick={() => setIsSignInForm(true)}
                className="text-green-400"
              >
                Sign In
              </strong>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
