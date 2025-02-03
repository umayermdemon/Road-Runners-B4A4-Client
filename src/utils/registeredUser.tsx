import { useGetSingleUserQuery } from "@/redux/features/user/userManagementApi";
import AuthUser from "./authUser";

const RegisteredUser = () => {
  const user = AuthUser();
  const { data: registeredUser } = useGetSingleUserQuery(user?.email as string);

  return registeredUser;
};

export default RegisteredUser;
