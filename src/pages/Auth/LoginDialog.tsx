import * as React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { PersonOutlineOutlined } from "@mui/icons-material";
import { LoginFormFields } from "@/constance/formFields";
import { NavLink } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/features/user/userManagementApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

export default function LoginDialog() {
  const [open, setOpen] = React.useState(false);
  const [loginUser] = useLoginUserMutation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();

  // Handle Form Submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await loginUser(userInfo).unwrap();
      console.log(res);
      const user = jwtDecode(res?.data?.accessToken);
      console.log(user, "login");
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));

      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // reset();
    // handleClose();
  };

  return (
    <React.Fragment>
      <h1
        className="cursor-pointer hover:text-[#FF6600] transition"
        onClick={handleClickOpen}>
        <PersonOutlineOutlined />
      </h1>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            sx: {
              position: "absolute",
              top: 50,
              right: 30,
              transform: "translateX(-50%)",
              width: "18%",
            },
            onSubmit: handleSubmit(onSubmit), // Hook Form Submission
          },
        }}>
        <div className="p-4 mb-0 flex flex-row justify-between">
          <h2 className="text-lg font-semibold">Login</h2>
          <NavLink
            to="/register"
            onClick={handleClose}
            className="cursor-pointer hover:text-[#FF6600] transition hover:underline">
            Create an account
          </NavLink>
        </div>

        <DialogContent>
          {LoginFormFields.map(({ name, label, type }) => (
            <div key={name} className="mb-4">
              <TextField
                {...register(name, { required: `${label} is required` })}
                margin="dense"
                id={name}
                name={name}
                label={label}
                type={type}
                fullWidth
                size="medium"
                variant="outlined"
                error={!!errors[name]} // Error handling
                helperText={errors[name]?.message as string} // Show error message
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#FF6600" },
                    "&.Mui-focused fieldset": { borderColor: "#FF6600" },
                  },
                  "& .MuiInputLabel-root": { color: "#262626" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#FF6600" },
                }}
              />
            </div>
          ))}
        </DialogContent>

        <DialogActions>
          <button
            type="submit"
            className="w-full m-4 py-2 bg-[#FF6600] rounded-sm text-white font-semibold cursor-pointer hover:bg-[#262626] transition duration-300 ease-in-out">
            Login
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
