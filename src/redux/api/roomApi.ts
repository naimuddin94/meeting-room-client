/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { IDataWithMeta, IResponse, IRoom } from "@/Types";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllRooms: builder.query<
      IResponse<IDataWithMeta<IRoom>>,
      Record<string, any>
    >({
      query: (param) => {
        const params = new URLSearchParams();

        for (const key in param) {
          params.append(key, param[key]);
        }

        return {
          url: "/rooms",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["room"],
    }),
    fetchSingleRoom: builder.query<IResponse<IRoom>, string>({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "GET",
        };
      },
      providesTags: ["room"],
    }),
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
      invalidatesTags: ["room"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useFetchAllRoomsQuery,
  useFetchSingleRoomQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
