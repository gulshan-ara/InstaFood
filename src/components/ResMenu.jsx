import ShimmerUI from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";

const ResMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) {
    return <ShimmerUI />;
  }

  const resData = resInfo.data?.cards[2]?.card?.card?.info;
  const itemCards =
    resInfo.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards;

  console.log(itemCards, "new");

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
