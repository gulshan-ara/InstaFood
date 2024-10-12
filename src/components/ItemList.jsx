import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItemToCart, removeItem } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";
import { addToCart } from "../utils/firebaseAuth";
import QuantityCounter from "./QuantityCounter";

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
  const uid = useSelector((state) => state.auth?.uid) || null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState("");
  const [itemQuantity, setItemQuantity] = useState(item.quantity || 1);

  const handleAddItem = async (item) => {
    const addedItemDetails = {
      ...item,
      quantity: itemQuantity || 1,
    };
    // Dispatch an action
    dispatch(addItemToCart(addedItemDetails));
    if (isAuthenticated) {
      await addToCart(addedItemDetails, uid);
      setShowToaster(true);
      setToasterMsg("Item added to Cart!!");
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    } else {
      navigate("/login", { state: { from: "/cart", isToaster: true } });
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
              <p className="font-semibold text-gray-600">
                {itemQuantity} x {itemPrice} ₹
              </p>
            ) : (
              <p className="font-semibold text-gray-600">{itemPrice}₹</p>
            )}
          </div>
          <div>
            <p className="text-gray-600">{description}</p>
            {!isInCart && (
              <QuantityCounter
                quantity={itemQuantity}
                setQuantity={setItemQuantity}
              />
            )}
            <div className="flex flex-row gap-10">
              {isInCart ? (
                <button
                  onClick={() => handleRemoveItem(item)}
                  className="my-3 bg-orange-300 px-10 py-2 rounded-3xl font-medium"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await handleAddItem(item);
                  }}
                  className="my-3 bg-orange-300 px-10 py-2 rounded-3xl font-medium"
                >
                  Add to Cart
                </button>
              )}
              <button className="my-3 bg-green-400 px-10 py-2 rounded-3xl font-medium">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {showToaster && <Toaster message={toasterMsg} type={"success"} />}
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
