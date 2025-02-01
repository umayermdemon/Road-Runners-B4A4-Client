/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

type TInput = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  type?: string;
};

const RRInput = ({ name, label, register, type }: TInput) => {
  const isMultiline = name === "description";
  return (
    <div>
      <TextField
        {...register(name)}
        label={label}
        type={type}
        multiline={isMultiline}
        fullWidth
        sx={{ mb: 2 }}
      />
    </div>
  );
};

export default RRInput;
