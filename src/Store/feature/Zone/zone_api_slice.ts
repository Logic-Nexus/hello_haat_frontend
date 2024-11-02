import { apiSlice } from "../../api/apiSlice";

export const zone_api_slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    //get user last login info
    getZoneList: builder.query({
      query: (params: any) => ({
        url: "/zones/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
          last_login: true,
        },
      }),
      providesTags: ["zones"],
    }),

    //create
    createZone: builder.mutation({
      query: (zoneData: any) => ({
        url: "/zones/",
        method: "POST",
        body: zoneData,
      }),
      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["zones"] : [];
      },
    }),

    //checkEmployeeAssignedInZone
    getIsEmployeeAssignedInZone: builder.query({
      query: (params: any) => ({
        url: "/checkEmployeeAssignedInZone",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
    }),
    // zones/active-inactive
    updateZoneStatus: builder.mutation({
      query: ({ zoneId, body }: { zoneId: string; body: any }) => ({
        url: `/zones/active-inactive/${zoneId}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["zones"] : [];
      },
    }),

    // /zones/:id delete
    deleteZone: builder.mutation({
      query: ({ zoneId }: { zoneId: string }) => ({
        url: `/zones/${zoneId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["zones"] : [];
      },
    }),
  }),
});

export const {
  useGetZoneListQuery,
  useCreateZoneMutation,
  useGetIsEmployeeAssignedInZoneQuery,
  useUpdateZoneStatusMutation,
  useDeleteZoneMutation,

  //lazy
  useLazyGetZoneListQuery,
  useLazyGetIsEmployeeAssignedInZoneQuery,
} = zone_api_slice;