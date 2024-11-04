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
  }),
});

export const { useGetProductPurchaseQuery } = purchaseProduct_api_slice;
