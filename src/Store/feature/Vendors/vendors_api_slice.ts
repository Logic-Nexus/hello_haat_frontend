/* eslint-disable @typescript-eslint/no-explicit-any */
import { decryptData } from "../../../constant/encrytion";
import { apiSlice } from "../../api/apiSlice";

const vendors_api_slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getVendors: builder.query({
      query: (params: any) => {
        const superAdminId = decryptData("userData")?.user?.id || 0;

        return {
          url: "/vendors/",
          method: "GET",
          params: {
            ...(Object.keys(params)?.length > 0 && {
              ...params,
            }),
            superAdminId,
          },
        };
      },
    }),

    //get single vendor
    getSingleVendor: builder.query({
      query: ({ id }: { id: any }) => {
        return {
          url: `/vendors/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetVendorsQuery, useGetSingleVendorQuery } =
  vendors_api_slice;
