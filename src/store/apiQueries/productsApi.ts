import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GameProducts } from "../../types";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://hornybox-17db3-default-rtdb.europe-west1.firebasedatabase.app/"
    }),
    endpoints:(builder) => ({
        getGameProducts: builder.query<GameProducts, string>({
            query: (name: string) => `/${name}.json`,
        })
    })
});

export const { useGetGameProductsQuery } = productsApi;