/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button, Typography, Box } from "@mui/material";
import RRInput from "@/Form/RRInput";
import RRSelect from "@/Form/RRSelect";
import { useCreateProductMutation } from "@/redux/features/products/productsApi";

const brands = [
  "Mountain Bikes Inc.",
  "SpeedX",
  "CityRide",
  "OffRoadX",
  "EcoRide",
  "HybridMaster",
  "Marathon Bikes",
  "GreenWheels",
  "TrekMaster",
  "Volt Bikes",
  "Gravity Bikes",
];
const categories = ["Mountain", "Road", "Hybrid", "Electric"];

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [addProduct] = useCreateProductMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const convertedData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      };
      const productData = {
        product: convertedData,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(productData));
      formData.append("file", data?.productImage);
      console.log(Object.fromEntries(formData.entries()));
      const res = await addProduct(formData).unwrap();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        boxShadow: 2,
        borderRadius: 2,
        bgcolor: "white",
      }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, textAlign: "center", fontWeight: "500" }}>
        Create Bike Data
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <RRInput name="name" register={register} label="Bike Name" />

          <RRSelect
            name="brand"
            control={control}
            label="Brand"
            options={brands}
          />

          <RRSelect
            name="category"
            control={control}
            label="Category"
            options={categories}
          />

          <RRInput name="description" register={register} label="Description" />
          <div className="flex flex-row gap-2">
            <div className="flex-auto">
              <RRInput
                name="price"
                register={register}
                registerOptions={{ valueAsNumber: true }}
                label="Price ($)"
                type="number"
              />
            </div>
            <div className="flex-auto">
              <RRInput
                name="quantity"
                register={register}
                registerOptions={{ valueAsNumber: true }}
                label="Quantity"
                type="number"
              />
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Product Image
          </label>
          <Controller
            name="productImage"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, ...field } }) => (
              <div
                className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm 
                focus:ring-2 focus:ring-[#FF6600] focus:border-[#FF6600] focus:outline-none 
                ${
                  errors.productImage
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}>
                <input
                  type="file"
                  id="productImage"
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                  className="hidden"
                />
                <label
                  htmlFor="productImage"
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
          {errors.productImage && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="warning" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
