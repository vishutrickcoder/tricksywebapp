// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Service", "Booking"],
  endpoints: (builder) => ({
    // Services
    getServices: builder.query({ query: () => "/services", providesTags: ["Service"] }),
    addService: builder.mutation({ query: (service) => ({ url: "/services", method: "POST", body: service }), invalidatesTags: ["Service"] }),
    updateService: builder.mutation({ query: ({ id, ...service }) => ({ url: `/services/${id}`, method: "PUT", body: service }), invalidatesTags: ["Service"] }),
    deleteService: builder.mutation({ query: (id) => ({ url: `/services/${id}`, method: "DELETE" }), invalidatesTags: ["Service"] }),

    // Bookings
    createBooking: builder.mutation({ query: (booking) => ({ url: "/bookings", method: "POST", body: booking }), invalidatesTags: ["Booking"] }),
    getBookings: builder.query({ query: () => "/bookings", providesTags: ["Booking"] }),
    updateBookingStatus: builder.mutation({ query: ({ id, status }) => ({ url: `/bookings/${id}/status`, method: "PUT", body: { status } }), invalidatesTags: ["Booking"] }),
  }),
});

export const {
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useCreateBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
} = apiSlice;
