import { configureStore } from "@reduxjs/toolkit";
import { assetsApi, productsApi } from "./apiQueries";
import { userSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [assetsApi.reducerPath]: assetsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(assetsApi.middleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
