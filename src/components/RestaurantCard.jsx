import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resInfo } = props;
  const { cloudinaryImageId, name, avgRating, sla, cuisines } = resInfo?.info;

  return (
    <div className="flex flex-col flex-wrap w-64 h-96 mx-2 my-4 p-4 shadow-xl rounded-lg hover:bg-gray-200">
      <img
        className="w-64 h-48 rounded-md mx-auto"
        src={CDN_URL + cloudinaryImageId}
        alt="image"
      />
      <div>
        <h3 className="font-semibold my-2">{name}</h3>
        <p className="font-medium my-1">
          ⭐️ {avgRating} - {sla.slaString}
        </p>
        <p className="text-justify">{cuisines.join(", ")}</p>
      </div>
    </div>
  );
};

export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <h3 className="absolute bg-black text-white text-lg px-2 rounded-lg">Veg</h3>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
