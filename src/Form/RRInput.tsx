/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

type TInput = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  type?: string;
  registerOptions?: object;
};

const RRInput = ({
  name,
  label,
  register,
  type,
  registerOptions = {},
}: TInput) => {
  return (
    <div>
      <TextField
        {...register(name, registerOptions)}
        label={label}
        type={type}
        multiline={name === "description"}
        fullWidth
        sx={{ mb: 2 }}
      />
    </div>
  );
};

export default RRInput;
