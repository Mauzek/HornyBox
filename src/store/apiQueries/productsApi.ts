import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./config";
import type { GameProducts } from "../../types";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/products`
    }),
    endpoints:(builder) => ({
        getProducts: builder.query<GameProducts, string>({
            query: (name: string) => `/${name}.json`,
        })
    })
});

export const { useGetProductsQuery } = productsApi;