import React from "react";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import cartIcon from "../assets/cart.png";
import { useCartContext } from "../utils/CartContext";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const { getTotalItems } = useCartContext();
  return (
    <div className="w-full">
      <nav className="flex justify-between items-center w-full bg-blue-600 text-white h-20 fixed top-0 z-10">
        <h3 className="font-bold text-2xl mx-3">E-Commerce</h3>
        <Link to="/cart" className="text-center relative right-1">
          <img src={cartIcon} alt="carticon" className=" w-10 mx-3 " />
          <p className="w-5 h-5 text-black bg-yellow-500 absolute  rounded-full top-[-2px] right-0">
            <span className=" font-bold">{getTotalItems()}</span>
          </p>
          <p>cart</p>
        </Link>
      </nav>
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
        containerStyle={{
          position: "relative",
          top: 0,
          right: 0,
        }}
      />
      <ProductList />
      <footer className="flex justify-center items-center w-full bg-[darkslategray] text-white h-20 mt-6">
        <p className=" font-semibold text-sm text"> © 2024 e-commerce.com</p>
      </footer>
    </div>
  );
};

export default Home;
