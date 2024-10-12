import React from "react";

const QuantityCounter = ({ quantity, setQuantity }) => {
  return (
    <div className="flex flex-row items-center my-2">
      <p className="font-medium text-base">Quantity : </p>
      <button
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
        className="bg-slate-200 mx-5 px-4 py-1 text-lg font-bold"
      >
        -
      </button>
      <div className="mx-2 py-1 text-lg font-bold">{quantity}</div>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="bg-slate-200 mx-5 px-4 py-1 text-lg font-bold"
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;
