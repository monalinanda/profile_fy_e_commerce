import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import useFetchCart from "../utils/useFetchCart";
import { useCartContext } from "../utils/CartContext";
import useSearch from "../utils/useSearch";
import ShimmerLoading from "./ShimmerLoading";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useSearch(searchTerm, 300);
  const { cart } = useCartContext();
  useFetchCart();

  // Fetch all products from local db.json file
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [debouncedSearchTerm, products]);

  // Input field functionality for search products
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
        <ShimmerLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedCartProduct={cart.find((item) => item.id === product.id)}
            />
          ))}
        </div>
      )}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default ProductList;
