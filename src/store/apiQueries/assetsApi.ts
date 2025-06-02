import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Assets } from "../../types";

export const assetsApi = createApi({
    reducerPath: "assetsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://683af66643bb370a8674494c.mockapi.io",
    }),
    tagTypes: ["Assets"],
    endpoints: (builder) => ({
        getAssets: builder.query<Assets, void>({
            query: () => "/assets",
            transformResponse: (response: Assets[]) => response[0],
        })
    })
});

export const { useGetAssetsQuery } = assetsApi;