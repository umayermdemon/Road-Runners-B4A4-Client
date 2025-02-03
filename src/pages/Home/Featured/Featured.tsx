import Button from "@/components/Shared/Button";
import ProductsCard from "@/pages/AllProducts/AllProducts/ProductsCard";
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { CircularProgress } from "@mui/material";

const Featured = () => {
  const { data: product, isLoading } = useGetAllProductsQuery(undefined);
  console.log(product);

  const limitedProducts = Array.isArray(product)
    ? product.filter((p) => p.inStock).slice(0, 6)
    : [];
  if (isLoading)
    return (
      <div className=" min-h-[calc(100vh-295px)] flex justify-center items-center">
        <CircularProgress color="warning" />
      </div>
    );

  return (
    <div className="pb-4">
      <h1 className=" text-4xl font-semibold text-center">
        Top Picks for You!
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 mx-2">
        {limitedProducts.map((product) => (
          <ProductsCard key={product?._id} product={product} />
        ))}
      </div>
      <div className="text-center">
        <Button text={"View All"} />
      </div>
    </div>
  );
};

export default Featured;
