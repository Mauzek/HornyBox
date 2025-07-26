import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "../../types";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: true, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, clearUser } = userSlice.actions;

export default userSlice.reducer;