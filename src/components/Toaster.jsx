import React from "react";

const Toaster = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 bg-white text-black shadow-lg rounded-lg p-4 w-72 animate-slide-up">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Toaster;
