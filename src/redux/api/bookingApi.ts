import { baseApi } from "@/redux/api/baseApi";

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
      invalidatesTags: ["product", "order"],
    }),
    // fetchOrders: builder.query({
    //   query: () => ({
    //     url: "/carts/my-orders",
    //     method: "GET",
    //   }),
    //   providesTags: ["order"],
    // }),
    // fetchAllOrders: builder.query({
    //   query: (param) => {
    //     const params = new URLSearchParams();

    //     for (const key in param) {
    //       params.append(key, param[key]);
    //     }

    //     return {
    //       url: "/carts",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["orders"],
    // }),
    // changeCartStatus: builder.mutation({
    //   query: ({ cartId, status }) => ({
    //     url: `/carts/change-status/${cartId}`,
    //     method: "PATCH",
    //     body: { status },
    //   }),
    // }),
  }),
});

export const { useFetchPaymentKeyMutation, useCreateBookingMutation } =
  ordersApi;
