import { selectAuthToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLoginRegister = () => {
  const token = useAppSelector(selectAuthToken);
  return token ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedLoginRegister;
