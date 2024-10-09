import { useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import ShimmerUI from "./Shimmer";
import { Link, useParams } from "react-router-dom";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { locations } from "../utils/location";

const RestaurantContainer = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(null);
  const [filteredfRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const VegResCard = withVegLabel(RestaurantCard);
  const { city } = useParams();
  const selectedCity = city || "Ahmedabad";

  const location = locations.find(
    (loc) => loc.city.toLowerCase() === selectedCity?.toLowerCase()
  );

  if (!location) {
    return <div>Location not found</div>;
  }

  const { lat, lng } = location;

  useEffect(() => {
    fetchData();
  }, [selectedCity, location]);

  const fetchData = async () => {
    if (location) {
      setLoading(true);
      const data = await fetch(
        `https://corsproxy.io/?https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
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
      setLoading(false);
    }
  };

  const handleSearchRest = () => {
    const filteredR = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filteredR);
  };

  const handleTopRatedRest = () => {
    const filteredRest = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.4
    );
    setFilteredRestaurants(filteredRest);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <p className="text-center my-10 font-medium">
        Please check your internet connection!
      </p>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-xl my-10">
        Loading restaurants of {selectedCity}
      </div>
    );
  }

  // Conditional Rendering
  if (listOfRestaurants === undefined || listOfRestaurants === null) {
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
        {filteredfRestaurants != undefined &&
          filteredfRestaurants.map((restaurant) => {
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
