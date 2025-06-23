import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GameProducts } from "../../types";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints:(builder) => ({
        getGameProducts: builder.query<GameProducts, void>({
            query: (name) => `/${name}`
        })
    })
});

export const { useGetGameProductsQuery } = productsApi;