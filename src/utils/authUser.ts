import { selectAuthToken, TUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import verifyToken from "./verifyToken";

const AuthUser = () => {
  const token = useAppSelector(selectAuthToken);
  let user;
  if (token) {
    user = verifyToken(token as string) as TUser;
  }
  return user;
};

export default AuthUser;
