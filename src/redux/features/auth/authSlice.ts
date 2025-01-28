/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
export type TUser = {
  userEmail: string;
  role: string;
  iat: number;
  exp: number;
  data?: any;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthUser = (state: RootState) => state.auth.user;
