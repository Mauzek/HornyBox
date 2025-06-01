import { configureStore } from "@reduxjs/toolkit";
import { assetsApi } from "./apiQuerys";
import { userSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [assetsApi.reducerPath]: assetsApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(assetsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
