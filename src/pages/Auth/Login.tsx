import { LoginFormFields } from "@/constance/formFields";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLoginUserMutation } from "@/redux/features/user/userManagementApi";
import { useAppDispatch } from "@/redux/hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const togglePasswordVisibility = () => setShowPassword((item) => !item);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await loginUser(userInfo).unwrap();
      const user = jwtDecode(res?.data?.accessToken);
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      console.log(res, user);
      toast.success(res?.message);
      reset();
      const redirectPath = location?.state?.fromProduct
        ? `/productDetails/${location?.state?.fromProduct}`
        : "/"; // Default redirect path (home or dashboard)

      navigate(redirectPath, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto flex flex-col justify-center items-center  min-h-[calc(100vh-295px)]">
      <div className="p-4 mb-0 flex flex-row justify-center">
        <h2 className="text-3xl font-semibold">Login</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {LoginFormFields.map(({ name, label, type }) => (
          <div key={name} className="mb-4">
            <TextField
              {...register(name, { required: `${label} is required` })}
              margin="dense"
              id={name}
              name={name}
              label={label}
              type={
                name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              fullWidth
              size="medium"
              variant="outlined"
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#262626" },
                  "&:hover fieldset": { borderColor: "#FF6600" },
                  "&.Mui-focused fieldset": { borderColor: "#FF6600" },
                },
                "& .MuiInputLabel-root": { color: "#262626" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#FF6600" },
              }}
              slotProps={{
                input: {
                  endAdornment: name === "password" && (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
        ))}

        <div className="flex flex-row justify-center items-center mt-2">
          <button
            type="submit"
            className="w-1/2 py-2 bg-[#FF6600] rounded-sm  text-white font-semibold cursor-pointer hover:bg-[#262626] transition duration-300 ease-in-out">
            Login
          </button>
        </div>
      </form>
      <div className="flex flex-row gap-2 mt-2">
        <h1>Don't have an account?</h1>
        <NavLink to="/register" className="underline text-blue-600">
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
