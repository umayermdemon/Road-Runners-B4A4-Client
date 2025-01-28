/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import ProductsCard from "./ProductsCard";

const AllProducts = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetAllProductsQuery(undefined);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;
  if (!products || products.length === 0) return <p>No products found</p>;
  console.log(products);
  return (
    <div className="max-w-7xl mx-2 lg:mx-auto justify-center items-center grid md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
      {products?.data?.map((item: any) => (
        <ProductsCard key={item._id} product={item} />
      ))}
    </div>
  );
};

export default AllProducts;
