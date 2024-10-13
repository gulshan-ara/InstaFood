import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import Toaster from "./Toaster";
import { useState } from "react";
import { addItemToCart } from "../redux/cartSlice";
import { addToCart } from "../utils/firebaseAuth";
import { useNavigate } from "react-router-dom";

const ItemList = ({ items }) => {
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState("");
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn) || false;
  const uid = useSelector((state) => state.auth?.uid) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItem = async (item) => {
    const addedItemDetails = {
      ...item,
      quantity: item.quantity || 1,
    };
    dispatch(addItemToCart(addedItemDetails));
    if (isLoggedIn) {
      await addToCart(item, uid);
      setShowToaster(true);
      setToasterMsg("Item added to cart successfully!!");
      setTimeout(() => {
        setShowToaster(false);
      }, 3000);
    } else {
      navigate("/login", { state: { from: "/cart", isToaster: true } });
    }
  };

  return (
    <div>
      {items.map((item) => {
        return (
          <ItemCard
            key={item.card.info.id}
            item={item}
            handleAddItem={() => handleAddItem(item)}
          />
        );
      })}
      {showToaster && <Toaster message={toasterMsg} type={"success"} />}
    </div>
  );
};

export default ItemList;
