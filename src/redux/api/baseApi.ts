import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "baseAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5003/api",
  }),
  endpoints: () => ({}),
});

export default baseApi;
