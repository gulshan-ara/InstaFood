import { useEffect, useState } from "react";
import { RES_LIST_API } from "../utils/constants";

const useRestaurantList = () => {
  const [resList, setResList] = useState([]);
  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_LIST_API);
    const json = await data.json();
    console.log(json);
    setResList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return resList;
};

export default useRestaurantList;
