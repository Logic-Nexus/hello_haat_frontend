import { apiSlice } from "../../../api/apiSlice";

export const supplier_api_slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllSuppliers: builder.query({
      query: (params: any) => ({
        url: "suppliers",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
    }),
  }),
});

export const { useGetAllSuppliersQuery } = supplier_api_slice;
