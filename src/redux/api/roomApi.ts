import { baseApi } from "@/redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // fetchProducts: builder.query({
    //   query: (param) => {
    //     const params = new URLSearchParams();

    //     for (const key in param) {
    //       params.append(key, param[key]);
    //     }

    //     return {
    //       url: "/products",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["product"],
    // }),
    // fetchSingleProduct: builder.query({
    //   query: (id) => {
    //     return {
    //       url: `/products/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["product"],
    // }),
    addRoom: builder.mutation({
      query: (data) => ({
        url: "/rooms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["room"],
    }),
    updateRoom: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/rooms/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["product"],
    }),
    // deleteProducts: builder.mutation({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["product"],
    // }),
  }),
});

export const { useAddRoomMutation, useUpdateRoomMutation } = roomApi;
