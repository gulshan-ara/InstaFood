import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Outlet } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Q9LFLG4lHquzSiu9jP4BVu47JR7rrfS76Xzzbp9bqDRQGDUcBs9Eh4OckzGESe7MS0m16jNTm891uiE9iRITH2B00VTiW0a8x"
);

const OrderForm = () => {
  // const orderTotal = useSelector((state) => state.cart.orderTotal);
  const orderTotal = JSON.parse(localStorage.getItem("orderTotal"));
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://insta-food-server.vercel.app/create-payment-intent", {
    // fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: orderTotal }),
    })
      .then((res) => {
        // Check if the response is ok and has content
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle cases where the response might not have content
        return res.text().then((text) => (text ? JSON.parse(text) : {}));
      })
      .then((data) => {
        if (data && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("ClientSecret not found in response:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching PaymentIntent:", error);
      });
  }, [orderTotal]);

  const loader = "auto";

  return (
    <div>
      {clientSecret && (
        <Elements options={{ clientSecret, loader }} stripe={stripePromise}>
          <Outlet />
        </Elements>
      )}
    </div>
  );
};

export default OrderForm;
