/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import LoginDialog from "./LoginDialog";
import { RegisterFormFields } from "@/constance/formFields";

export default function RegisterDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <h1
        className="cursor-pointer hover:text-[#FF6600] transition hover:underline"
        onClick={handleClickOpen}>
        Create an account
      </h1>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            sx: {
              position: "absolute",
              top: 50, // Move 50px from top
              right: 30,
              transform: "translateX(-50%)", // Keep it centered horizontally
              width: "18%",
            },
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}>
        <div className="p-4 mb-0 flex flex-row justify-between">
          <h2 className="text-lg font-semibold">Register</h2>
          <h1
            onClick={handleClose}
            className="text-[#FF6600] hover:underline cursor-pointer"
            title="Already have an account? Login">
            <LoginDialog />
          </h1>
        </div>
        <DialogContent>
          {RegisterFormFields.map(({ id, name, label, type }) => (
            <TextField
              autoFocus
              required
              margin="dense"
              id={id}
              name={name}
              label={label}
              type={type}
              fullWidth
              size="medium"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#262626", // Default border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#FF6600", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FF6600", // Focused border color
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#262626", // Label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF6600", // Label color on focus
                },
              }}
            />
          ))}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <button
            type="submit"
            className="w-full m-4 py-2 bg-[#FF6600] rounded-sm text-white font-semibold cursor-pointer hover:bg-[#262626] transition duration-300 ease-in-out">
            Register
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
