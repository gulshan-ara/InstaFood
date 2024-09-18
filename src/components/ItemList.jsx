import { CDN_URL } from "../utils/constants";

const ItemCard = ({ item }) => {
  const {
    name,
    description,
    price,
    defaultPrice,
    imageId,
    cloudinaryImageId,
  } = item?.card?.info;
  return (
    <div className="bg-white shadow-lg my-4 p-4 rounded-lg">
      <div className="flex flex-row justify-between">
        {cloudinaryImageId && (
          <img
            src={CDN_URL + cloudinaryImageId}
            className="w-14 rounded-lg h-16"
          />
        )}
        <img src={CDN_URL + imageId} className="w-14 rounded-lg h-16" />
        <div className="mx-4 flex-1">
          <div className="flex  flex-row justify-between">
            <span className="font-medium text-lg">{name}</span>
            <button className="bg-green-400 text-white px-4 rounded-full h-8 my-auto">
              Add
            </button>
          </div>
          <div>
            <p className="font-semibold text-gray-600">
              {price ? parseInt(price) / 100 : parseInt(defaultPrice) / 100}₹
            </p>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => {
        return <ItemCard key={item.card.info.id} item={item} />;
      })}
    </div>
  );
};

export default ItemList;
