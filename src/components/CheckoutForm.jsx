import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://instafood-nine.vercel.app/order/complete",
        // return_url: "http://localhost:1234/order/complete",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={`mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded 
        hover:bg-blue-700 transition-colors duration-300 
        ${
          isLoading || !stripe || !elements
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner border-t-transparent border-4 border-white rounded-full w-6 h-6 mx-auto animate-spin"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
