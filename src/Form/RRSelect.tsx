/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, Control } from "react-hook-form";

type TSelect = {
  name: string;
  label: string;
  control: Control<any>;
  options: string[];
};

const RRSelect = ({ name, label, control, options }: TSelect) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} value={field.value || ""}>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default RRSelect;
