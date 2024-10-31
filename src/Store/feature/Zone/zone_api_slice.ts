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
    }),
  }),
});

export const { useGetZoneListQuery } = zone_api_slice;
