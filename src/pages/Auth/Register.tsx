import { RegisterFormFields } from "@/constance/formFields";
import { useRegisterUserMutation } from "@/redux/features/user/userManagementApi";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword((item) => !item);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", data?.userImage);

      const res = await registerUser(formData).unwrap();
      if (res.error) {
        console.log(res.error);
      }

      navigate("/login");
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col justify-center items-center py-4 min-h-[calc(100vh-295px)]">
      <h2 className="text-3xl font-semibold p-4">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 md:w-full">
        {RegisterFormFields.map(({ name, label, type }) => (
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

        {/* Custom File Uploader for Profile Image */}
        <div className="relative mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Profile Image
          </label>
          <Controller
            name="userImage"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, ...field } }) => (
              <div
                className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm 
                focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] focus:outline-none 
                ${
                  errors.userImage
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}>
                <input
                  type="file"
                  id="userImage"
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                  className="hidden"
                />
                <label
                  htmlFor="userImage"
                  className={`cursor-pointer ${
                    value
                      ? "text-gray-700"
                      : "text-xs text-white bg-gray-400 py-1 px-2 rounded-md"
                  }`}>
                  {value ? value.name : "Choose Image"}
                </label>
              </div>
            )}
          />
          {errors.userImage && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="w-1/2 py-2 bg-[#FF6600] rounded-sm text-white font-semibold cursor-pointer hover:bg-[#262626] transition duration-300 ease-in-out">
            Register
          </button>
        </div>
      </form>

      <div className="flex flex-row gap-2 mt-2">
        <h1>Already have an account?</h1>
        <NavLink to="/login" className="underline text-blue-600">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
