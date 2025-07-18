import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./config";
import type { Article, Assets, Video } from "../../types";

export const assetsApi = createApi({
    reducerPath: "assetsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    tagTypes: ["Assets"],
    endpoints: (builder) => ({
        getAssets: builder.query<Assets, void>({
            query: () => "/assets.json",
        }),
        getVideos: builder.query<Video[], void>({
            query: () => "/assets/videos.json",
        }),
        getArticles: builder.query<Article[], void>({
            query: () => "/assets/articles.json",
        })
    })
});

export const { useGetAssetsQuery, useGetVideosQuery, useGetArticlesQuery } = assetsApi;