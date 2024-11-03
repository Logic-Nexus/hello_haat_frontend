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
      query: (body: any) => ({
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
      query: (id: any) => ({
        url: `delete-supplier/${id}`,
        method: "DELETE",
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
} = supplier_api_slice;
