import { useDispatch, useSelector } from "react-redux";
import { ItemCard } from "./ItemList";
import { clearCart } from "../redux/cartSlice";

const Cart = () => {
  const itemInCart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h3>Cart Page</h3>
      {itemInCart.map((item) => {
        return <ItemCard item={item} isInCart={true} />;
      })}
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
