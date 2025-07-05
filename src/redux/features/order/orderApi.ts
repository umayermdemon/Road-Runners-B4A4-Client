import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
    getAllOrderByEmail: builder.query({
      query: (email: string) => ({
        url: `/orders/customer/${email}`,
        method: "GET",
      }),
    }),
    VerifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useVerifyOrderQuery,
  useGetAllOrderByEmailQuery,
} = orderApi;
