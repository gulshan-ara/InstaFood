import React from "react";

const LocationCard = ({ city, state, country }) => {
  return (
    <div className="my-2 rounded-lg shadow-lg bg-white bg-opacity-30 px-2 py-4">
      <h3 className="font-medium text-lg">{city}</h3>
      <p className="text-gray-400">
        {state}, {country}
      </p>
    </div>
  );
};

export default LocationCard;
