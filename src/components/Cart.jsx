import React, { useState } from "react";
import { useCartContext } from "../utils/CartContext";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import cuponTag from "../assets/cuponTag.png";
import discount from "../assets/discount.png";
import { toast, Toaster } from "react-hot-toast";
import useFetchCart from "../utils/useFetchCart";

const Cart = () => {
  const navigate = useNavigate();
  useFetchCart();
  const {
    cart,
    emptyCart,
    removeFromCart,
    updateQuantity,
    applyDiscount,
    calculateTotal,
    discountValue,
    totalPriceBeforeDiscount,
  } = useCartContext();
  const [selectedCoupon, setSelectedCoupon] = useState();

  const totalPrice = calculateTotal();

  //Discount functionality and use applyDiscount function from context
  const handleApplyDiscount = (value) => {
    if (value === "FIXED10") {
      setSelectedCoupon(value);
      toast(value + "Cupon Code Added", {
        duration: 800,
      });
      applyDiscount("fixed", 10);
    } else if (value === "PERCENT10") {
      setSelectedCoupon(value);
      toast(value + "Cupon Code Added", {
        duration: 800,
      });
      applyDiscount("percentage", 10);
    } else {
      alert("Invalid discount code");
    }
  };

  //toggle functionality for cupons
  const toggleDiscount = () => {
    applyDiscount(null, 0);
    setSelectedCoupon("");
  };

  const handleCheckout = async () => {
    await emptyCart()
    navigate("/thank-you");
  };

  return (
    <>
      <nav className="flex justify-between items-center w-full bg-blue-600 text-white h-20 fixed top-0 z-10">
        <Link to="/">
          <h3 className="font-bold text-2xl mx-3">E-Commerce</h3>
        </Link>
      </nav>
      <div className="container mx-auto p-6 mt-12">
        <h1 className="lg:text-3xl text-sm font-bold my-8">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 bg-gray-100 p-6">
            <p className=" text-2xl font-semibold">Your cart is empty 👜 😞</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between">
            <Toaster
              toastOptions={{
                className: "",
                style: {
                  border: "1px solid #713200",
                  padding: "10px",
                  color: "#fff",
                  backgroundColor: "darkslategray",
                },
              }}
            />
            <div className="lg:w-3/5">
              <>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </>
            </div>
            <div className="lg:w-2/5 mt-8 lg:mt-0 lg:ml-8 bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Price Details</h3>
              {selectedCoupon && (
                <div className="flex  items-center  justify-between">
                  <p className="flex  items-center gap-2 text-sm">
                    <img src={discount} className="w-7 h-7 " />
                    <span className=" font-bold">
                      {selectedCoupon}{" "}
                      <span className="font-medium">Cupon Code Added</span>
                    </span>
                  </p>
                  <button
                    className="rounded-full bg-slate-600 w-5 h-5 text-center"
                    onClick={toggleDiscount}
                  >
                    <p className=" text-white text-sm">X</p>
                  </button>
                </div>
              )}
              <div className="flex justify-between mb-2 mt-2">
                <span>Total MRP</span>
                <span>₹{totalPriceBeforeDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span>{discountValue}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              {/* Apply Discounts */}
              <div className="mt-6">
                <div className="flex">
                  <img src={cuponTag} className="w-8" />
                  <h3 className="text-lg font-medium ml-1">Apply Cupons</h3>
                </div>
                <div className="flex space-x-4 mt-4">
                  <ul className="flex gap-6">
                    <li
                      className={`border border-dotted border-black text-center cursor-pointer p-3  ${
                        selectedCoupon === "FIXED10"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      } `}
                      onClick={() => handleApplyDiscount("FIXED10")}
                    >
                      FIXED10
                    </li>
                    <li
                      className={`border border-dotted border-black text-center cursor-pointer p-3  ${
                        selectedCoupon === "PERCENT10"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      } `}
                      onClick={() => handleApplyDiscount("PERCENT10")}
                    >
                      PERCENT10
                    </li>
                  </ul>
                  <div></div>
                  <div></div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-[darkslategray] text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
