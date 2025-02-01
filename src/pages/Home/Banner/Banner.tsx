import { useGetAllProductsQuery } from "@/redux/features/products/productsApi";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const { data: product } = useGetAllProductsQuery(undefined);

  const limitedProducts = Array.isArray(product)
    ? product.filter((p) => p.inStock).slice(0, 4)
    : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % limitedProducts.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + limitedProducts.length) % limitedProducts.length
    );
  };

  return (
    <div className="relative w-full pb-8">
      <div className="carousel-container">
        {limitedProducts && limitedProducts.length > 0 ? (
          <div className="carousel">
            <div key={currentIndex} className="carousel-item relative">
              <img
                src={limitedProducts[currentIndex].productImage}
                alt={limitedProducts[currentIndex].name}
                className="w-full h-[calc(100vh-350px)] object-fill rounded-b-xl"
              />
              <div className="absolute inset-0 bg-black opacity-40 rounded-b-xl"></div>
              <div className="carousel-caption absolute z-10 bottom-1/3 left-1/2 transform -translate-x-1/2 space-y-4 sm:space-y-8 text-center">
                <h1 className="text-4xl lg:text-5xl text-white">
                  Gear Up for <br /> the Ride of Your Life
                </h1>
                <NavLink to="/allProducts">
                  <button className="text-white border-4 border-[#ff6600] bg-[#ff6600] hover:bg-black hover:opacity-70 hover:border-4 hover:border-[#ff6600] p-2 cursor-pointer rounded-sm">
                    Shop Now!
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-red-400">No products found</div>
        )}
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center px-4 sm:px-8">
        <button
          onClick={goToPrevious}
          className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100">
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Banner;
