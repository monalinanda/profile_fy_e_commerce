import React from "react";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="flex items-center border-b py-4">
      <img
        src={item.imgSrc}
        alt={item.name}
        className="w-20 h-20 object-cover mr-4"
      />
      <div className="flex-grow">
        <h3 className="lg:text-lg text-sm lg:font-semibold font-normal">{item.name}</h3>
        <p className="text-gray-600"> &#x20b9;{item.price}</p>
      </div>

      {/* update Quantity Button */}
      <div className="flex items-center">
        <button
          onClick={() =>
            updateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          className="bg-gray-200 px-2 py-1 rounded"
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          +
        </button>
      </div>

      {/* Remove item Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="lg:ml-4 text-red-500 hover:text-red-700 ml-1"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
