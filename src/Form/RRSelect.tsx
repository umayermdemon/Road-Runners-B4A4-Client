/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

type TSelect = {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  options: string[];
};

const RRSelect = ({ name, label, register, options }: TSelect) => {
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>{label}</InputLabel>
      <Select {...register(name)}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RRSelect;
