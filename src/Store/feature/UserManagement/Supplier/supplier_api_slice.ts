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
      providesTags: ["Supplier"],
    }),

    //create
    createSupplier: builder.mutation({
      query: ({ body }: { body: any }) => ({
        url: "create-supplier",
        method: "POST",
        body: body,
      }),
      invalidatesTags: (result: any) => {
        return result ? [{ type: "Supplier" }] : [];
      },
    }),

    //delete
    deleteSupplier: builder.mutation({
      query: ({ supplierId }: { supplierId: any }) => ({
        url: `suppliers/${supplierId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any) => {
        return result ? [{ type: "Supplier" }] : [];
      },
    }),

    //active-inactive status
    supplierActiveInactiveStatus: builder.mutation({
      query: ({ supplierId, body }: { supplierId: any; body: any }) => ({
        url: `suppliers/active-inactive/${supplierId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result: any) => {
        return result ? [{ type: "Supplier" }] : [];
      },
    }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
  useSupplierActiveInactiveStatusMutation,
} = supplier_api_slice;
