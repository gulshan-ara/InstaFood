import ShimmerUI from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../hooks/useRestaurantMenu";
import ResCategory from "./ResCategory";
import { useState } from "react";

const ResMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [expandedItemIndex, setExpandedItemIndex] = useState(null);

  if (resInfo === null || resInfo === undefined) {
    return <ShimmerUI />;
  }

  const resData = resInfo.data?.cards[2]?.card?.card?.info;
  const categories = resInfo.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="m-10">
      <h1 className="text-3xl font-bold text-center">{resData.name}'s Menu</h1>
      {categories.map((item, index) => {
        return (
          <ResCategory
            key={item.card?.card?.title}
            data={item.card?.card}
            showItem={index === expandedItemIndex ? true : false}
            setExpandedItemIndex={() => setExpandedItemIndex(index)}
          />
        );
      })}
    </div>
  );
};

export default ResMenu;
