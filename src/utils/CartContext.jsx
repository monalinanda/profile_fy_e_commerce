import React, { createContext, useState, useContext } from "react";

const Context = createContext();

export const CartContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [SelectedId, setSelectedId] = useState();
  const [discount, setDiscount] = useState({ type: null, value: 0 });
  const [discountValue, setDiscountValue] = useState(0);
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);

  // "Add to Cart" functionality
  const addToCart = async (product, quantity) => {
    try {
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: quantity,
        };
        const response = await fetch(
          `http://localhost:3000/cart/${product.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedItem),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update cart item");
        }
        const data = await response.json();
        setCart(cart.map((item) => (item.id === product.id ? data : item)));
        setSelectedId(product.id);
      } else {
        const newItem = { ...product, quantity };
        const response = await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        if (!response.ok) {
          throw new Error("Failed to add item to cart");
        }
        const data = await response.json();
        setCart([...cart, data]);
        setSelectedId(product.id);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  // "Remove Items From Cart" functionality
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      setCart(cart.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  // "Update Item Quantity in Cart" functionality
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const item = cart.find((item) => item.id === productId);
      if (item) {
        const updatedItem = { ...item, quantity: newQuantity };
        const response = await fetch(
          `http://localhost:3000/cart/${productId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedItem),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update item quantity");
        }
        const data = await response.json();
        setCart(cart.map((item) => (item.id === productId ? data : item)));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };

  // "Discount Cupons in Cart page Items (total Amount)" functionality
  const applyDiscount = (type, value) => {
    setDiscount({ type, value });
    setDiscountValue(value);
  };
  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPriceBeforeDiscount(subtotal);
    let discountAmount = 0;

    if (discount.type === "fixed") {
      discountAmount = discount.value;
    } else if (discount.type === "percentage") {
      discountAmount = subtotal * (discount.value / 100);
      setDiscountValue(discountAmount);
    }

    return Math.max(subtotal - discountAmount, 0);
  };

  //"Calculate Cart Total items" functionality"
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Context.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        applyDiscount,
        calculateTotal,
        SelectedId,
        discountValue,
        totalPriceBeforeDiscount,
        products,
        setCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCartContext = () => useContext(Context);
