import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resInfo } = props;
  const {
    cloudinaryImageId,
    name,
    avgRatingString,
    sla,
    cuisines,
  } = resInfo?.info;

  return (
    <div className="res-card">
      <img
        className="res-card-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="image"
      />
      <div className="res-card-info">
        <h3 className="res-card-title">{name}</h3>
        <p className="res-card-rating">
          ⭐️ {avgRatingString} - {sla.slaString}
        </p>
        <p>{cuisines.join(", ")}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
