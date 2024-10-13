import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { clearCart } from "../redux/cartSlice";

const Cart = () => {
  const itemInCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
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
            <ItemCard key={item.card?.info?.id} item={item} isInCart={true} />
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
      {/* {showToaster && <Toaster message={toasterMsg} type={"success"}/>} */}
    </div>
  );
};

export default Cart;
