/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../api/apiSlice";

const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: {
    mutation: (arg0: {
      query: (body: any) => {
        url: string;
        method: string;
        body?: any;
      };
      invalidatesTags?: string[];
    }) => any;
    query: (arg0: {
      query: ({ email }: { email: string }) => {
        url: string;
        method: string;
        body?: any;
      };
      providesTags?: string[];
    }) => any;
  }) => ({
    createProfile: builder.mutation({
      query: (body: any) => ({
        url: "/create-profile",
        method: "POST",
        body,
      }),

      invalidatesTags: ["profile"],
    }),

    //getLinks

    getProfileData: builder.query({
      query: () => ({
        url: `/get-profile`,
        method: "GET",
      }),

      providesTags: ["profile"],
    }),
  }),
});

export const { useCreateProfileMutation, useGetProfileDataQuery } =
  profileApiSlice;
