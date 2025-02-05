import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import AllProducts from "@/pages/AllProducts/AllProducts/AllProducts";
import Register from "@/pages/Auth/Register";
import ProductDetails from "@/pages/AllProducts/AllProducts/ProductDetails";
import Login from "@/pages/Auth/Login";
import ProtectedLoginRegister from "@/components/Layout/ProtectedLoginRegister";

import {
  logOut,
  selectAuthToken,
  selectAuthUser,
  TUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ProtectedRoute from "@/components/Layout/ProtectedRoute";
import CreateProduct from "@/pages/Admin/ProductManagement/CreateProduct";
import AdminAllProducts from "@/pages/Admin/ProductManagement/AdminAllProducts";
import AllUser from "@/pages/Admin/UserManagement/AllUser";
import verifyToken from "@/utils/verifyToken";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Checkout from "@/pages/Order/Checkout";
import Profile from "@/pages/Profile/Profile";
import VerifyOrder from "@/pages/Order/VerifyOrder";
import CustomerOrder from "@/pages/Customer/CustomerOrder/CustomerOrder";

const RoutesWrapper = () => {
  const token = useAppSelector(selectAuthToken);
  const currentUser = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  let user;
  if (token) {
    user = verifyToken(token);
  }
  if ((user as TUser)?.role !== currentUser?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace />;
  }
  const dashboardChildren =
    (user as TUser)?.role === "Admin"
      ? [
          { index: true, element: <AdminAllProducts /> },
          { path: "products", element: <AdminAllProducts /> },
          { path: "create-product", element: <CreateProduct /> },
          { path: "all-user", element: <AllUser /> },
        ]
      : [
          { index: true, element: <CustomerOrder /> },
          { path: "customer-order", element: <CustomerOrder /> },
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
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute role="Customer">
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/order/verify",
          element: (
            <ProtectedRoute role="Customer">
              <VerifyOrder />
            </ProtectedRoute>
          ),
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
        <ProtectedRoute role={(user as TUser)?.role}>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: dashboardChildren,
    },
  ]);
  return <RouterProvider router={routes} />;
};
export default RoutesWrapper;
