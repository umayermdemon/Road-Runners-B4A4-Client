/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Button, Typography, Box } from "@mui/material";
import RRInput from "@/Form/RRInput";
import RRSelect from "@/Form/RRSelect";

// Sample brands and categories data
const brands = ["Volt Bikes", "Yamaha", "Honda", "BMW"];
const categories = ["Electric", "Mountain", "Road", "Hybrid"];

const ProductForm = () => {
  // Initialize react-hook-form with default values
  const { register, handleSubmit } = useForm({});

  // Submit handler for the form
  const onSubmit = (data: any) => {
    console.log("Submitted Product:", data);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
        bgcolor: "white",
      }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Crate Bike Data
      </Typography>
      {/* Create bike form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Bike Name Field */}

        <RRInput name="name" register={register} label="Bike Name" />

        {/* Brand Select Field */}

        <RRSelect
          name="brand"
          register={register}
          label="Brand"
          options={brands}
        />

        {/* Price Field */}
        <RRInput
          name="price"
          register={register}
          label="Price ($)"
          type="number"
        />

        {/* Category Select Field */}

        <RRSelect
          name="category"
          register={register}
          label="Category"
          options={categories}
        />
        {/* Description Field */}

        <RRInput name="description" register={register} label="Description" />

        {/* Quantity Field */}
        <RRInput
          name="quantity"
          register={register}
          label="Quantity"
          type="number"
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
