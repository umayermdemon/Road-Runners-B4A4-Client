import { selectAuthToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLoginRegister = () => {
  const token = useAppSelector(selectAuthToken);
  const location = useLocation();
  const redirectPath = location.state?.fromProduct
    ? `/productDetails/${location.state.fromProduct}`
    : location?.state?.from
      ? location?.state?.from
      : "/";
  return token ? <Navigate to={redirectPath} /> : <Outlet />;
};

export default ProtectedLoginRegister;
