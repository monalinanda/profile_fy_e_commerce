import { useCartContext } from "../utils/CartContext";
import useFetchCart from "../utils/useFetchCart";
import toast from "react-hot-toast";

const ProductCard = ({ product, selectedCartProduct }) => {
  const { addToCart, removeFromCart } = useCartContext();
  // useFetchCart();

  //"Add to Cart functionality "
  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity);
    toast("Added to cart !", {
      duration: 800,
    });
  };

  //counter functionality for show quantity on product card when Decrease button clicked
  const handleDecreaseToCart = (quantity, product) => {
    if (quantity > 1) {
      addToCart(product, Math.max(1, quantity - 1));
    } else {
      removeFromCart(product.id);
      toast("Item is removed from your cart !", {
        duration: 800,
      });
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg cursor-pointer group  relative overflow-hidden">
      <img
        src={product.imgSrc}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600 mt-2 text-sm">{product.description}</p>

      {/* show and hide button for "Add To Cart" button and "quantity" buttons */}
      {selectedCartProduct?.quantity > 0 ? (
        <div className="items-baseline justify-between  bg-white absolute bottom-0 right-0  px-4 py-2 rounded ">
          <div className="flex items-center mt-4">
            <button
              onClick={() =>
                handleDecreaseToCart(selectedCartProduct?.quantity, product)
              }
              className="bg-gray-200 px-2 py-1 rounded-l"
            >
              -
            </button>
            <span className="bg-gray-100 px-4 py-1">
              {selectedCartProduct?.quantity}
            </span>
            <button
              onClick={() =>
                addToCart(
                  product,
                  Math.max(0, selectedCartProduct?.quantity + 1)
                )
              }
              className="bg-gray-200 px-2 py-1 rounded-r"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-baseline justify-between  bg-white absolute bottom-0 right-0 transform  translate-y-16 group-hover:translate-y-0  px-4 py-2 rounded transition-transform duration-300 ease-in-out">
          <button
            onClick={() => handleAddToCart(product, 1)}
            className=" h-10 text-white border border-gray-500 px-4 py-2 rounded bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      )}
      <p className="text-lg font-medium mt-2">Rs.{product.price}</p>
    </div>
  );
};

export default ProductCard;
