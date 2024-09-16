import ShimmerUI from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import ResCategory from "./ResCategory";

const ResMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null || resInfo === undefined) {
    return <ShimmerUI />;
  }

  const resData = resInfo.data?.cards[2]?.card?.card?.info;
  const itemCards =
    resInfo.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    resInfo.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    resInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    resInfo.data?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards;

  const categories = resInfo.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center">{resData.name}'s Menu</h1>
      {/* <ul className="flex flex-row flex-wrap justify-center my-4">
        {itemCards === undefined && <h4>Sorry, Nothing to serve now!</h4>}
        {itemCards !== undefined &&
          itemCards.map((item) => {
            return (
              <li
                key={item.card.info.id}
                className="w-48 mx-5 my-4 px-5 py-4 text-center rounded-lg shadow-xl font-medium text-base bg-violet-100"
              >
                {item.card.info.name}
              </li>
            );
          })}
      </ul> */}
      {categories.map((item) => {
        return <ResCategory key={item.card?.card?.id} data={item.card?.card} />;
      })}
    </div>
  );
};

export default ResMenu;
