import { configureStore } from "@reduxjs/toolkit";
import { assetsApi, productsApi } from "./apiQueries";
import { userSlice, cartSlice } from "./slices";

export const store = configureStore({
  reducer: {
    [assetsApi.reducerPath]: assetsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(assetsApi.middleware, productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
