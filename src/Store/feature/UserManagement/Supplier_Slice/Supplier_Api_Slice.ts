import { apiSlice } from "../../../api/apiSlice";

export const supplier_Api_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({

    getAllSuppliers: builder.query({
      query: (params: any) => ({
        url: "/suppliers",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["suppliers"],
    }),

    
  }),
});

export const {
  useGetAllSuppliersQuery,
} = supplier_Api_Slice;
