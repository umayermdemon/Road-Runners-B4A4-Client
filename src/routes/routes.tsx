import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import AllProducts from "@/pages/AllProducts/AllProducts/AllProducts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
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
    ],
  },
]);

export default routes;
