import { useEffect } from "react";
import { useCartContext } from "./CartContext";

//coustom hook for fetch Cart items
const useFetchCart = () => {
  const { setCart } = useCartContext();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
        setCart(data ? data : []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]);
      } finally {
      }
    };

    fetchCart();
  }, [setCart]);
};

export default useFetchCart;
