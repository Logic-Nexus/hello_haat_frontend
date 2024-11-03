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

    //create
    createSupplier: builder.mutation({
      query: (body: any) => ({
        url: "create-supplier",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetAllSuppliersQuery, useCreateSupplierMutation } =
  supplier_api_slice;
