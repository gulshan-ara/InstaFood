import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "./ItemCard";
import { addOrderTotal, clearCart, removeItem } from "../redux/cartSlice";
import { clearCartFromDb, deleteCartItem } from "../utils/firebaseAuth";
import { useState } from "react";
import Toaster from "./Toaster";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const itemInCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = useSelector((state) => state.auth?.uid);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState("");
  const [toasterType, setToasterType] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleRemoveItem = async (item) => {
    dispatch(removeItem(item));
    await deleteCartItem(item.card.info.id, uid);
    setShowToaster(true);
    setToasterType(null);
    setToasterMsg("Item removed from cart.");
    setTimeout(() => {
      setShowToaster(false);
    }, 3000);
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    await clearCartFromDb(uid);
    setShowToaster(true);
    setToasterType(null);
    setToasterMsg("Cleared Cart.");
    setTimeout(() => {
      setShowToaster(false);
    }, 3000);
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
      setToasterType(null);
      setToasterMsg("Item removed from order.");
    } else {
      // Add item to selectedItems
      setSelectedItems((prevItems) => [...prevItems, item]);
      setToasterMsg("Item added to order.");
      setToasterType("success");
    }

    setShowToaster(true);
    setTimeout(() => {
      setShowToaster(false);
    }, 3000);
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
      setShowToaster(true);
      setToasterType(null);
      setToasterMsg("No items selected.");
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
      {showToaster && <Toaster message={toasterMsg} type={toasterType} />}
    </div>
  );
};

export default Cart;
