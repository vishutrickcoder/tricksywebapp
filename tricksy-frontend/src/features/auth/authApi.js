import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tricksywebapp.onrender.com/api/v1/auth", // backend URL
    credentials: "include", // include cookies (refreshToken)
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "/refresh-token",
        method: "POST", // must match backend
        credentials: "include", // send cookies
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    profile: builder.query({
      query: () => "/profile",
    }),
     getUsers: builder.query({
      query: () => "/admin/users",
    }),
    makeAdmin: builder.mutation({
      query: (userId) => ({
        url: `/admin/make-admin/${userId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useRefreshTokenQuery,
  useLogoutMutation,
  useProfileQuery,
  useGetUsersQuery,
  useMakeAdminMutation,
} = authApi;


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api/v1/auth",
//     credentials: "include", // send cookies
//   }),
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: (data) => ({ url: "/register", method: "POST", body: data }),
//     }),
//     verifyOtp: builder.mutation({
//       query: (data) => ({ url: "/verify-otp", method: "POST", body: data }),
//     }),
//     login: builder.mutation({
//       query: (data) => ({ url: "/login", method: "POST", body: data }),
//     }),
//     refreshToken: builder.query({
//       query: () => ({ url: "/refresh-token", method: "POST", credentials: "include" }),
//     }),
//     logout: builder.mutation({
//       query: () => ({ url: "/logout", method: "POST" }),
//     }),
//     profile: builder.query({
//       query: () => "/profile",
//     }),
//   }),
// });

// export const {
//   useRegisterMutation,
//   useVerifyOtpMutation,
//   useLoginMutation,
//   useRefreshTokenQuery,
//   useLogoutMutation,
//   useProfileQuery,
// } = authApi;
