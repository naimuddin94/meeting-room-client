import { baseApi } from "@/redux/api/baseApi";

const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchRatings: builder.query({
      query: () => ({
        url: "/ratings",
        method: "GET",
      }),
      providesTags: ["rating"],
    }),
    addRating: builder.mutation({
      query: (newRating) => ({
        url: "/ratings",
        method: "POST",
        body: newRating,
      }),
      invalidatesTags: ["rating"],
    }),
    fetchRatingsByProductId: builder.query({
      query: ({ id, param }) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }
        return {
          url: `/ratings/product/${id}`,
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const {
  useFetchRatingsQuery,
  useAddRatingMutation,
  useFetchRatingsByProductIdQuery,
} = ratingApi;
