import { baseApi } from "@/redux/api/baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchBrands: builder.query({
      query: ({ param }) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/brands",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["brand"],
    }),
    fetchSingBrandByName: builder.query({
      query: (name) => {
        return {
          url: `/brands/fetch-by-name/${name}`,
          method: "GET",
        };
      },
    }),
    addBrand: builder.mutation({
      query: (newBrand) => ({
        url: "/brands",
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brand"],
    }),
  }),
});

export const {
  useFetchBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useFetchSingBrandByNameQuery,
} = brandApi;
