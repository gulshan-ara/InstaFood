import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { loadStripe } from "@stripe/stripe-js";

const CartItemCard = ({ item, handleRemoveItem }) => {
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
  const itemQuantity = item.quantity;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Q9LFLG4lHquzSiu9jP4BVu47JR7rrfS76Xzzbp9bqDRQGDUcBs9Eh4OckzGESe7MS0m16jNTm891uiE9iRITH2B00VTiW0a8x"
    );

    const body = {
      products: cart,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        "http://localhost:3000/create_checkout_session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      // Check if response is successful
      if (!response.ok) {
        const errorDetails = await response.json(); // You might want to log the error details
        console.error("Failed to create checkout session:", errorDetails);
        return; // Exit early if the fetch fails
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error); // Log any Stripe redirect errors
      }
    } catch (error) {
      console.error("An error occurred while making the payment:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg my-4 p-4 rounded-lg">
      <div className="flex flex-row justify-between">
        <img src={CDN_URL + itemImage} className="w-14 rounded-lg h-16" />
        <div className="mx-4 flex-1">
          <div className="flex  flex-row justify-between">
            <span className="font-medium text-lg">{name}</span>
            <p className="font-semibold text-gray-600">
              {itemQuantity} x {itemPrice} ₹
            </p>
          </div>
          <div>
            <p className="text-gray-600">{description}</p>
            <div className="flex flex-row gap-10">
              <button
                onClick={() => handleRemoveItem(item)}
                className="w-full my-3 bg-orange-300 py-2 rounded-3xl font-medium"
              >
                Remove from Cart
              </button>

              <button
                onClick={makePayment}
                className="w-full my-3 bg-green-400 py-2 rounded-3xl font-medium"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
