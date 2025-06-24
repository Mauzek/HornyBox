import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Assets } from "../../types";

export const assetsApi = createApi({
    reducerPath: "assetsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://hornybox-17db3-default-rtdb.europe-west1.firebasedatabase.app",
    }),
    tagTypes: ["Assets"],
    endpoints: (builder) => ({
        getAssets: builder.query<Assets, void>({
            query: () => "/assets.json",
        })
    })
});

export const { useGetAssetsQuery } = assetsApi;