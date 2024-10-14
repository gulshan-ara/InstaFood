import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./ItemCard";
import { clearCart, removeItem } from "../redux/cartSlice";
import { clearCartFromDb, deleteCartItem } from "../utils/firebaseAuth";
import { useState } from "react";
import Toaster from "./Toaster";

const Cart = () => {
  const itemInCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth?.uid);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState("");

  const handleRemoveItem = async (item) => {
    dispatch(removeItem(item));
    await deleteCartItem(item.card.info.id, uid);
    setShowToaster(true);
    setToasterMsg("Item removed from cart.");
    setTimeout(() => {
      setShowToaster(false);
    }, 3000);
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    await clearCartFromDb(uid);
    setShowToaster(true);
    setToasterMsg("Cleared Cart.");
    setTimeout(() => {
      setShowToaster(false);
    }, 3000);
  };

  return (
    <div className="w-6/12 mx-auto my-8 bg-gray-100 px-4 py-2 shadow-md rounded-lg flex flex-col justify-center">
      {itemInCart.length === 0 ? (
        <div>
          <p className="text-center font-semibold">
            Nothing in cart yet! Please add items to cart.
          </p>
        </div>
      ) : (
        itemInCart.map((item) => {
          return (
            <CartItemCard
              key={item.card?.info?.id}
              item={item}
              handleRemoveItem={handleRemoveItem}
            />
          );
        })
      )}
      {itemInCart.length !== 0 && (
        <button
          className="bg-red-400 text-white px-4 py-2 rounded-xl shadow-lg mx-auto"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      )}
      {showToaster && <Toaster message={toasterMsg} type={"success"} />}
    </div>
  );
};

export default Cart;
