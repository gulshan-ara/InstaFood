import ShimmerUI from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";

const ResMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  console.log(resInfo);

  if (resInfo === null || resInfo === undefined) {
    return <ShimmerUI />;
  }

  const resData = resInfo.data?.cards[2]?.card?.card?.info;
  console.log(resData, "res");
  const itemCards =
    resInfo.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    resInfo.data?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    resInfo.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    resInfo.data?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards;

  console.log(itemCards, "new");

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center">{resData.name}'s Menu</h1>
      <ul className="flex flex-row flex-wrap justify-center my-4">
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
      </ul>
    </div>
  );
};

export default ResMenu;
