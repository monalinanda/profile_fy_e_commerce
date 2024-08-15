import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useFetchCart from "../utils/useFetchCart";
import { useCartContext } from "../utils/CartContext";
import useSearch from "../utils/useSearch";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useSearch(searchTerm, 300);
  const { cart } = useCartContext();
  useFetchCart();

  //fetch Products from local db.json file *
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/products?name_like=${debouncedSearchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchTerm]);

  //input field functionality for searvh products
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 pt-20 ">
      <h1 className="text-3xl font-bold my-8">Product Listing</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedCartProduct={cart.find((item) => item.id === product.id)}
            />
          ))}
        </div>
      )}
      {!isLoading && products.length === 0 && (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default ProductList;
