import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./ItemCard";
import { clearCart, removeItem } from "../redux/cartSlice";
import { clearCartFromDb, deleteCartItem } from "../utils/firebaseAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const itemInCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth?.uid);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleRemoveItem = async (item) => {
    dispatch(removeItem(item));
    await deleteCartItem(item.card.info.id, uid);
    toast.error("Item removed from cart.");
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    await clearCartFromDb(uid);
    toast.error("Cart cleared.");
  };

  const handleToggleOrder = (item) => {
    const isItemSelected = selectedItems.some(
      (selectedItem) => selectedItem.card.info.id === item.card.info.id
    );

    if (isItemSelected) {
      // Remove item from selectedItems
      setSelectedItems((prevItems) =>
        prevItems.filter(
          (selectedItem) => selectedItem.card.info.id !== item.card.info.id
        )
      );
      toast.error("Item removed from order.");
    } else {
      // Add item to selectedItems
      setSelectedItems((prevItems) => [...prevItems, item]);
      toast.success("Item added to order.");
    }
  };

  const subTotal = (items) => {
    let total = 0;
    items.map((item) => {
      const itemPrice = item.card.info.price
        ? item.card.info.price / 100
        : item.card.info.defaultPrice / 100;

      total += itemPrice * item.quantity;
    });
    return total;
  };

  const handleProceed = () => {
    if (selectedItems.length === 0) {
      toast.error("No item selected yet.")
    } else {
      localStorage.setItem(
        "orderTotal",
        JSON.stringify(subTotal(selectedItems) + 80)
      );
      navigate("/order");
    }
  };

  return (
    <div className="px-auto">
      {itemInCart.length === 0 && (
        <div>
          <p className="text-center font-semibold">
            Nothing in cart yet! Please add items to cart.
          </p>
        </div>
      )}
      {itemInCart.length !== 0 && (
        <div className="flex flex-row gap-10">
          <div className="w-8/12 mx-10">
            {itemInCart.map((item) => {
              const isItemSelected = selectedItems.some(
                (selectedItem) =>
                  selectedItem.card.info.id === item.card.info.id
              );
              return (
                <CartItemCard
                  key={item.card?.info?.id}
                  item={item}
                  handleRemoveItem={handleRemoveItem}
                  handleOrder={() => {
                    handleToggleOrder(item);
                  }}
                  isSelected={isItemSelected}
                />
              );
            })}
            <button
              className="bg-red-400 text-white px-4 py-2 rounded-xl shadow-lg mx-auto"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="w-4/12 mx-10 my-5">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="flex flex-row justify-between my-2">
              <p>Subtotal ({selectedItems.length} items)</p>
              <p className="text-base font-medium">{subTotal(selectedItems)}</p>
            </div>
            <div className="flex flex-row justify-between my-2">
              <p>Shipping fee</p>
              <p className="text-base font-medium">80</p>
            </div>
            <div className="flex flex-row justify-between my-2">
              <p>Total</p>
              <p className="text-base font-medium">
                {subTotal(selectedItems) + 80}
              </p>
            </div>
            <button
              onClick={handleProceed}
              className="w-full my-2 rounded-2xl shadow-2xl bg-green-400 py-2 text-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
