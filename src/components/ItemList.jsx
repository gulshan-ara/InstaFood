import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ item, isInCart }) => {
  const {
    name,
    description,
    price,
    defaultPrice,
    imageId,
    cloudinaryImageId,
  } = item?.card?.info;
  const itemPrice = price
    ? parseInt(price / 100)
    : parseInt(defaultPrice / 100);
  const itemImage = imageId ? imageId : cloudinaryImageId;
  const isAuthenticated = useSelector((state) => state.auth?.email) || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // Dispatch an action
    dispatch(addItem(item));
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login", { state: { from: "/cart" } });
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="bg-white shadow-lg my-4 p-4 rounded-lg">
      <div className="flex flex-row justify-between">
        <img src={CDN_URL + itemImage} className="w-14 rounded-lg h-16" />
        <div className="mx-4 flex-1">
          <div className="flex  flex-row justify-between">
            <span className="font-medium text-lg">{name}</span>
            {isInCart ? (
              <button
                className="bg-red-400 text-white px-4 rounded-full h-8 my-auto"
                onClick={() => {
                  handleRemoveItem(item);
                }}
              >
                Remove
              </button>
            ) : (
              <button
                className="bg-green-400 text-white px-4 rounded-full h-8 my-auto"
                onClick={() => {
                  handleAddItem(item);
                }}
              >
                Add
              </button>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-600">{itemPrice}₹</p>
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
