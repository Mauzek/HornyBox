import { configureStore } from "@reduxjs/toolkit";
import { assetsApi } from "./apiQueries";
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
