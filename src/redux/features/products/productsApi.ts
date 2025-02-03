/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["product"],
    }),
    getAllProductsWithSearch: builder.query({
      query: ({
        search = "",
        brand = "",
        category = "",
        inStock,
        page = 1,
        limit = 8,
      }) => {
        return {
          url: "/products",
          method: "GET",
          params: {
            search: search || undefined,
            brand: brand || undefined,
            category: category || undefined,
            inStock: inStock ? true : undefined, // Send only if true
            page,
            limit,
          },
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response?.data,
          meta: response.meta,
        };
      },
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data;
      },
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetAllProductsWithSearchQuery,
  useCreateProductMutation,
} = productsApi;
