import { apiSlice } from "../../../api/apiSlice";

export const purchaseProduct_api_slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // product-purchase
    getProductPurchase: builder.query({
      query: (params: any) => ({
        url: "/product-purchase/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["product-purchase"],
    }),
    // product-purchase
    createProductPurchase: builder.mutation({
      query: (body: any) => ({
        url: "/product-purchase/",
        method: "POST",
        body,
      }),
      invalidatesTags: (result: any) => {
        return result ? ["product-purchase"] : [];
      },
    }),

    //product-purchase delete
    deleteProductPurchase: builder.mutation({
      query: ({ productPurchaseId }: { productPurchaseId: any }) => ({
        url: `/product-purchase/${productPurchaseId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result: any) => {
        return result ? ["product-purchase"] : [];
      },
    }),
  }),
});

export const {
  useGetProductPurchaseQuery,
  useCreateProductPurchaseMutation,
  useDeleteProductPurchaseMutation,
} = purchaseProduct_api_slice;
