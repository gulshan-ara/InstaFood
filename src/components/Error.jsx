import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="m-10">
      <h1 className="text-lg font-bold">Oops!!</h1>
      <h2 className="text-lg font-bold">Something went wrong</h2>
      <h3 className="text-lg font-medium">
        {err.status} : {err.statusText}
      </h3>
    </div>
  );
};

export default Error;
