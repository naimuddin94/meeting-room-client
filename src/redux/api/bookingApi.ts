/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { IBooking, IDataWithMeta, IResponse } from "@/Types";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchPaymentKey: builder.mutation({
      query: (price) => ({
        url: "/payments",
        method: "POST",
        body: { price },
      }),
    }),
    fetchMyBooking: builder.query<
      IResponse<IDataWithMeta<IBooking>>,
      Record<string, any>
    >({
      query: (param) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/my-bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["booking"],
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["booking"],
    }),
    fetchAllBookings: builder.query<
      IResponse<IDataWithMeta<IBooking>>,
      Record<string, any>
    >({
      query: (param) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/bookings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["booking"],
    }),
    changeBookingStatus: builder.mutation({
      query: ({ bookingId, isConfirmed }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        body: { isConfirmed },
      }),
      invalidatesTags: ["booking"],
    }),
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useFetchPaymentKeyMutation,
  useFetchMyBookingQuery,
  useCreateBookingMutation,
  useFetchAllBookingsQuery,
  useChangeBookingStatusMutation,
  useDeleteBookingMutation,
} = ordersApi;
