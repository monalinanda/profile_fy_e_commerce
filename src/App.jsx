import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { CartContext } from "./utils/CartContext";
import ThankYou from "./components/Thankyou";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/product/:id",
      element: <ProductCard />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/thank-you",
      element: <ThankYou />,
    },
  ]);
  return (
    <>
      <CartContext>
        <div className=" m-0 p-0 w-screen h-screen overflow-scroll">
          <RouterProvider router={appRouter} />
          hii
        </div>
      </CartContext>
    </>
  );
}

export default App;
