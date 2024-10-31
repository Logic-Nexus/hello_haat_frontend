import { apiSlice } from "../api/apiSlice";

export const globalApi_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    //get user last login info
    getUserLastLoginInfo: builder.query({
      query: (params: any) => ({
        url: "/user-login-history/",
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

export const { useGetUserLastLoginInfoQuery } = globalApi_Slice;
