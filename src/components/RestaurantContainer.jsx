import { useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import { Link, useParams } from "react-router-dom";
import { AhmedabadRestaurants } from "../utils/ahmedabadRestaurants";
import { RajkotRestaurants } from "../utils/rajkotRestaurants";
import { MumbaiRestaurants } from "../utils/mumbaiRestaurants";

const RestaurantContainer = () => {
  const { city } = useParams();
  const selectedCity = city || "Ahmedabad";
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const VegResCard = withVegLabel(RestaurantCard);

  useEffect(() => {
    let cityRestaurants;
    switch (selectedCity) {
      case "Mumbai":
        cityRestaurants = MumbaiRestaurants.restaurants;
        break;
      case "Rajkot":
        cityRestaurants = RajkotRestaurants.restaurants;
        break;
      default:
        cityRestaurants = AhmedabadRestaurants.restaurants;
    }
    setRestaurants(cityRestaurants);
    setFilteredRestaurants(cityRestaurants);
  }, [selectedCity]);

  const handleSearchRest = () => {
    const filteredResults = restaurantData.restaurants.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filteredResults);
  };

  const handleTopRatedRest = () => {
    const filteredResults = restaurantData.restaurants.filter(
      (res) => res.avgRating > 4.4
    );
    setFilteredRestaurants(filteredResults);
  };

  return (
    <div className="mx-10 flex flex-col flex-grow">
      <div className="flex justify-between m-10">
        <div className="flex justify-between">
          <input
            className="mx-10 rounded-3xl px-4 py-4 w-96 h-12 border border-slate-400"
            placeholder="Search for Restaurants..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue-300 px-10 rounded-full h-12 font-semibold"
            onClick={handleSearchRest}
          >
            Search
          </button>
        </div>
        <button
          className="bg-lime-500 px-10 rounded-full h-12 font-semibold"
          onClick={handleTopRatedRest}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center align-middle">
        {filteredRestaurants.map((restaurant) => (
          <Link key={restaurant.id} to={"/restaurants/" + restaurant.id}>
            {restaurant.veg ? (
              <VegResCard resInfo={{ info: restaurant }} />
            ) : (
              <RestaurantCard resInfo={{ info: restaurant }} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantContainer;
