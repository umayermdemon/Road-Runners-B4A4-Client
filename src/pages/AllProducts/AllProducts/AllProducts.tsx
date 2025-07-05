/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllProductsWithSearchQuery } from "@/redux/features/products/productsApi";
import ProductsCard from "./ProductsCard";
import {
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { categoryItem } from "@/constance/categoryItem";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: products, isLoading } = useGetAllProductsWithSearchQuery({
    search,
    brand,
    category,
    inStock,
    page,
    limit,
  });
  const brands =
    products?.data?.reduce((acc: string[], product: { brand: string }) => {
      if (!acc.includes(product.brand)) {
        acc.push(product.brand);
      }
      return acc;
    }, []) || [];
  const brandsWithAll = ["All", ...brands];

  if (isLoading)
    return (
      <div className=" min-h-[calc(100vh-295px)] flex justify-center items-center">
        <CircularProgress color="warning" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-4">
      {/* Search & Filters */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 mx-4">
        {/* Search */}
        <TextField
          label="Search by Name, Brand, or Category"
          variant="standard"
          color="warning"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full"
        />

        {/* Brand Filter */}
        <FormControl className="w-full">
          <InputLabel color="warning">Brand</InputLabel>
          <Select
            value={brand}
            color="warning"
            variant="standard"
            onChange={(e) => setBrand(e.target.value)}>
            {brandsWithAll?.map((brand) => (
              <MenuItem key={brand} value={brand === "All" ? "" : brand}>
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Category Filter */}
        <FormControl className="w-full">
          <InputLabel color="warning">Category</InputLabel>
          <Select
            value={category}
            variant="standard"
            color="warning"
            onChange={(e) => setCategory(e.target.value)}>
            {categoryItem.map((item) => (
              <MenuItem key={item.item} value={item.value}>
                {item.item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range */}
        {/* <div className="w-full">
          <p className="mb-1 text-gray-600">
            Price Range: ${minPrice} - ${maxPrice}
          </p>
          <Slider
            value={[minPrice, maxPrice]}
            onChange={(_, newValue) => {
              const [min, max] = newValue as number[];
              setMinPrice(min);
              setMaxPrice(max);
            }}
            valueLabelDisplay="auto"
            min={100}
            max={5000}
          />
        </div> */}

        {/* Availability */}
        <FormControlLabel
          control={
            <Checkbox
              checked={inStock}
              color="warning"
              onChange={(e) => setInStock(e.target.checked)}
            />
          }
          label="In Stock Only"
        />
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2">
        {products?.data?.map((item: any) => (
          <ProductsCard key={item._id} product={item} />
        ))}
      </div>

      {/* Pagination */}
      {products?.data?.length === 0 ? (
        <div className="text-center text-red-400 ">
          <p>No products found</p>
        </div>
      ) : (
        <div className="flex justify-center mt-6">
          <Pagination
            count={products?.meta?.totalPage || 1}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
