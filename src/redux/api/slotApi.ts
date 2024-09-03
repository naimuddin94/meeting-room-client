import { baseApi } from "@/redux/api/baseApi";
import { TResponse, TSlot } from "@/Types";

export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAvailableSlots: builder.query<
      TResponse<TSlot[]>,
      Record<string, string>
    >({
      query: (param) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/slots/availability",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["slot"],
    }),
    createSlot: builder.mutation({
      query: (data) => ({
        url: "/slots",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slot"],
    }),
  }),
});

export const { useFetchAvailableSlotsQuery, useCreateSlotMutation } = slotApi;
