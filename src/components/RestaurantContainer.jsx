import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import ShimmerUI from "./Shimmer";

const RestaurantContainer = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonVal = await data.json();
    // Optional Chaining
    setListOfRestaurants(
      jsonVal?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  // Conditional Rendering
  if (listOfRestaurants.length === 0) {
    return <ShimmerUI />;
  }

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
