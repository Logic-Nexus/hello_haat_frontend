import { apiSlice } from "../../../api/apiSlice";

export const customer_Api_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllCustomers: builder.query({
      query: (params: any) => ({
        url: "/customers/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["customers"],
    }),
  }),
});

export const { useGetAllCustomersQuery } =
customer_Api_Slice;