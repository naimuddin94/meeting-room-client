import { baseApi } from "@/redux/api/baseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/carts",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["product", "order"],
    }),
    fetchOrders: builder.query({
      query: () => ({
        url: "/carts/my-orders",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    fetchAllOrders: builder.query({
      query: (param) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/carts",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["orders"],
    }),
    changeCartStatus: builder.mutation({
      query: ({ cartId, status }) => ({
        url: `/carts/change-status/${cartId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchAllOrdersQuery,
  useChangeCartStatusMutation,
} = ordersApi;
