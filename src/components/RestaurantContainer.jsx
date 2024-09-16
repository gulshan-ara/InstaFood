import { useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import ShimmerUI from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";

const RestaurantContainer = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredfRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const VegResCard = withVegLabel(RestaurantCard);

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
    setFilteredRestaurants(
      jsonVal?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>Please check your internet connection!</h1>;
  }
  // Conditional Rendering
  if (listOfRestaurants == []) {
    return <ShimmerUI />;
  }

  return (
    <div className="mx-10">
      <div className="flex justify-between m-10">
        <div className="flex justify-between">
          <input
            className="mx-10 rounded-3xl px-4 py-4 w-96 h-12 border border-slate-400"
            placeholder="Search for Restaurants..."
            value={searchText}
            onChange={(txt) => setSearchText(txt.target.value)}
          />
          <button
            className="bg-blue-300 px-10 rounded-full h-12 font-semibold"
            onClick={() => {
              const filteredR = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurants(filteredR);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="bg-lime-500 px-10 rounded-full h-12 font-semibold"
          onClick={() => {
            const filteredRest = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.5
            );
            setFilteredRestaurants(filteredRest);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center align-middle">
        {filteredfRestaurants.map((restaurant) => {
          return (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {restaurant.info.veg ? (
                <VegResCard resInfo={restaurant} />
              ) : (
                <RestaurantCard resInfo={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantContainer;
