import { apiSlice } from "../../api/apiSlice";

export const orderList_api_slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getOrderList: builder.query({
      query: (params: any) => ({
        url: "orders",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["orderList"],
    }),
  }),
});
export const { useGetOrderListQuery } = orderList_api_slice;
