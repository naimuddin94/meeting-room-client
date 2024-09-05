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
      query: ({ bookingId, status }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useFetchPaymentKeyMutation,
  useCreateBookingMutation,
  useFetchAllBookingsQuery,
  useChangeBookingStatusMutation,
} = ordersApi;
