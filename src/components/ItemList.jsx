import { useDispatch, useSelector } from "react-redux";
import Toaster from "./Toaster";
import { useState } from "react";
import { addItemToCart } from "../redux/cartSlice";
import { addToCart } from "../utils/firebaseAuth";
import { useNavigate } from "react-router-dom";
import MenuItemCard from "./MenuItemCard";

const ItemList = ({ items, resId }) => {
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState("");
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn) || false;
  const uid = useSelector((state) => state.auth?.uid) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItem = async (item, quantity) => {
    const addedItemDetails = {
      ...item,
      quantity,
    };
    dispatch(addItemToCart(addedItemDetails));
    if (isLoggedIn) {
      await addToCart(addedItemDetails, uid);
      setShowToaster(true);
      setToasterMsg("Item added to cart successfully!!");
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    } else {
      navigate("/login", {
        state: { from: `/restaurants/${resId}`, isToaster: true },
      });
    }
  };

  return (
    <div>
      {items.map((item) => {
        return (
          <MenuItemCard
            key={item.card.info.id}
            item={item}
            handleAddItem={handleAddItem}
          />
        );
      })}
      {showToaster && <Toaster message={toasterMsg} type={"success"} />}
    </div>
  );
};

export default ItemList;
