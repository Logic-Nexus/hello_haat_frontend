import { apiSlice } from "../../../api/apiSlice";

export const stockReport_api_slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    // product-stock-report
    getProductPurchaseStockReport: builder.query({
      query: (params: any) => ({
        url: "/product-stock-report/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["product-stock-report"],
    }),
  }),
});

export const { useGetProductPurchaseStockReportQuery } = stockReport_api_slice;
