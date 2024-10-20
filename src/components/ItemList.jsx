import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { addToCart } from "../utils/firebaseAuth";
import { useNavigate } from "react-router-dom";
import MenuItemCard from "./MenuItemCard";
import { toast, ToastContainer } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemList = ({ items, resId }) => {
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
      toast.success("Item added to cart.");
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
      <ToastContainer />
    </div>
  );
};

export default ItemList;
