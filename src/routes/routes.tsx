import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import AllProducts from "@/pages/AllProducts/AllProducts/AllProducts";
import Register from "@/pages/Auth/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProducts",
        element: <AllProducts />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default routes;
