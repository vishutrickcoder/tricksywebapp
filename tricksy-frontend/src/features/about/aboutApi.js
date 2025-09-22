import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
     baseUrl: "https://tricksywebapp.onrender.com/api", // backend URL
     credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["About"],
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => "/about",
      providesTags: ["About"],
    }),
    saveAbout: builder.mutation({
      query: (formData) => ({
        url: "/about",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["About"],
    }),
    deleteAbout: builder.mutation({
      query: () => ({
        url: "/about",
        method: "DELETE",
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const { useGetAboutQuery, useSaveAboutMutation, useDeleteAboutMutation } = aboutApi;
