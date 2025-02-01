import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import AllProducts from "@/pages/AllProducts/AllProducts/AllProducts";
import Register from "@/pages/Auth/Register";
import ProductDetails from "@/pages/AllProducts/AllProducts/ProductDetails";
import Login from "@/pages/Auth/Login";
import ProtectedLoginRegister from "@/components/Layout/ProtectedLoginRegister";

import { selectAuthUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "@/components/Layout/ProtectedRoute";
import CreateProduct from "@/pages/Admin/ProductManagement/CreateProduct";
import AdminAllProducts from "@/pages/Admin/ProductManagement/AdminAllProducts";
import AllUser from "@/pages/Admin/UserManagement/AllUser";
import Dashboard from "@/pages/Dashboard/Dashboard";
import CustomerProfile from "@/pages/Customer/CustomerProfile/CustomerProfile";

const RoutesWrapper = () => {
  const user = useAppSelector(selectAuthUser);
  const dashboardChildren =
    user?.role === "Admin"
      ? [
          { index: true, element: <AdminAllProducts /> },
          { path: "products", element: <AdminAllProducts /> },
          { path: "create-product", element: <CreateProduct /> },
          { path: "all-user", element: <AllUser /> },
        ]
      : [
          { index: true, element: <CustomerProfile /> },
          { path: "customer-profile", element: <CustomerProfile /> },
        ];

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
          path: "/productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          element: <ProtectedLoginRegister />,
          children: [
            {
              path: "/register",
              element: <Register />,
            },
            {
              path: "/login",
              element: <Login />,
            },
          ],
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: dashboardChildren,
    },
  ]);
  return <RouterProvider router={routes} />;
};
export default RoutesWrapper;
