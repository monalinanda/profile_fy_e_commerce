import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-semibold text-green-600 mb-4">
          Thank You!
        </h1>
        <p className="text-lg mb-6">Your order has been placed successfully.</p>
        <p className="text-gray-700 mb-6">
          You will receive an order confirmation email shortly.
        </p>

        <button
          onClick={handleContinueShopping}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
