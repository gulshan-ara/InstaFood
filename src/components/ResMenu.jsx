import { useEffect, useState } from "react";
import ShimmerUI from "./Shimmer";
import { useParams } from "react-router-dom";

const ResMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.022505&lng=72.5713621&restaurantId=" +
        resId
    );

    const json = await data.json();
    setResInfo(json);
  };

  if (resInfo === null) {
    return <ShimmerUI />;
  }

  const resData = resInfo.data?.cards[2]?.card?.card?.info;
  const itemCards =
    resInfo.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards;

  return (
    <div className="menu">
      <h1>{resData.name}</h1>
      <h2> Menu</h2>
      <ul>
        {itemCards.map((item) => {
          return <li key={item.card.info.id}>{item.card.info.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default ResMenu;
