import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { resData } from "../utils/resData";

const RestaurantContainer = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(resData);

  return (
    <div className="body-container">
      <div className="search-container">
        <input className="search" placeholder="Search for Restaurants..." />
      </div>
      <button
        className="filter-btn"
        onClick={() => {
          const filteredRest = listOfRestaurants.filter(
            (res) => res.info.avgRating > 4.5
          );
          setListOfRestaurants(filteredRest);
        }}
      >
        Top Rated Restaurants
      </button>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.info.id} resInfo={restaurant} />
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantContainer;
