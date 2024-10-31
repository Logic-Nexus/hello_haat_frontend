import { loginDataType } from "../../../Types/login_types";
import { apiSlice } from "../../api/apiSlice";

export const authApi_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (loginData: loginDataType) => ({
        url: "/login/",
        method: "POST",
        body: loginData,
      }),
    }),

    getCurrentUser: builder.query({
      query: (params: any) => ({
        url: "/current-user/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["currentUser"],
    }),

    register: builder.mutation({
      query: (body: { username: string; password: string; email: string }) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery, useRegisterMutation } =
  authApi_Slice;
