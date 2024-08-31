import { baseApi } from "@/redux/api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (param) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product"],
    }),
    fetchSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, updateProduct }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updateProduct,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation,
} = productApi;
