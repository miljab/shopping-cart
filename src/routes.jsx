import App from "./App";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Products from "./components/Products";

const routes = [
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
    ],
  },
];

export default routes;
