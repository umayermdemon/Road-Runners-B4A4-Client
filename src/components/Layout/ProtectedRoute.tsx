import {
  logOut,
  selectAuthToken,
  selectAuthUser,
  TUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import verifyToken from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TRoute = {
  children: ReactNode;
  role: string;
};

const ProtectedRoute = ({ children, role }: TRoute) => {
  const token = useAppSelector(selectAuthToken);
  const currentUser = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log(location);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  if ((user as TUser)?.role !== currentUser?.role) {
    dispatch(logOut());
    return <Navigate state={{ from: location.pathname }} to="/login" replace />;
  }

  if (role !== (user as TUser)?.role) {
    dispatch(logOut());
    return <Navigate state={{ from: location.pathname }} to="/login" replace />;
  }

  if (!token) {
    return <Navigate state={{ from: location.pathname }} to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
