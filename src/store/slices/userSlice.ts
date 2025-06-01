import { createSlice } from "@reduxjs/toolkit";
import type { UserData } from "../../types";
import { loadFromLocalStorage } from "../../utils";

const initialState: UserData = loadFromLocalStorage("user");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userSlice.actions;
