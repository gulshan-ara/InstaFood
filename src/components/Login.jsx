import React from "react";
import { BACKGROUND_IMG } from "../utils/constants";

const Login = () => {
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="flex justify-center items-center w-1/2 h-full bg-green-300">
        <div className="bg-white w-96 px-10 py-5 shadow-lg rounded-lg flex flex-col">
          <h3 className="text-2xl font-semibold my-5">Sign In</h3>
          <input
            placeholder="Email"
            className="my-2 bg-slate-100 bg-opacity-80 px-3 py-2 rounded-lg shadow-xl"
          />
          <input
            placeholder="Password"
            className="my-2 bg-slate-100 bg-opacity-80 px-3 py-2 rounded-lg shadow-xl"
          />
          <button className="my-2 bg-green-300 py-2 rounded-lg shadow-xl">
            Sign In
          </button>
          {/* <a href="" className="text-center">Forgot Password?</a> */}
          <div className="flex flex-row">
            <input type="checkbox" className="mr-2" />
            <p>Remember me</p>
          </div>
          <p className="my-1">
            New to InstaFood? <strong className="text-green-400">Sign Up</strong>
          </p>
        </div>
      </div>
      <div className="bg-white w-1/2 h-full">
        <div className="bg-gray-400 bg-opacity-30 px-20 py-5 shadow-lg rounded-lg flex flex-col">
          <h3 className="text-2xl font-semibold my-5">Sign In</h3>
          <input
            placeholder="Email"
            className="my-2 px-3 py-2 rounded-lg shadow-xl"
          />
          <input
            placeholder="Password"
            className="my-2 bg-white px-3 py-2 rounded-lg shadow-xl"
          />
          <button className="my-2 bg-lime-500 py-2 rounded-lg shadow-xl">
            Sign In
          </button>
          {/* <a href="" className="text-center">Forgot Password?</a> */}
          <div className="flex flex-row">
            <input type="checkbox" className="mr-2" />
            <p>Remember me</p>
          </div>
          <p className="my-1">
            New to InstaFood? <strong className="text-white">Sign Up</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
