import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5003/api",
  baseUrl: "https://bike-store-api-a4a2.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseAPi",
  baseQuery: baseQuery,
  tagTypes: ["product"],
  endpoints: () => ({}),
});
