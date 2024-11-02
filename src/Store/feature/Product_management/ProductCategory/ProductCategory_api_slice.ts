import { apiSlice } from "../../../api/apiSlice";

export const productCategory_api_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getProductCategory: builder.query({
      query: (params: any) => ({
        url: "/product-category/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["productCategory"],
    }),

    //create product category
    createProductCategory: builder.mutation({
      query: (body: any) => ({
        url: "/product-category/",
        method: "POST",
        body,
      }),
      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["productCategory", "productCategoryNameListData"] : [];
      },
    }),

    //update product category
    productCategoryUpdate: builder.mutation({
      query: ({ categoryId, body }: { categoryId: any; body: any }) => {
        return {
          url: `/product-category/${categoryId}`,
          method: "PUT",
          body: body,
        };
      },

      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["productCategory", "productCategoryNameListData"] : [];
      },
    }),

    //delete product category
    productCategoryDelete: builder.mutation({
      query: ({ categoryId }: { categoryId: any }) => {
        return {
          url: `/product-category/${categoryId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["productCategory", "productCategoryNameListData"] : [];
      },
    }),

    // product-category/active-inactive
    productCategoryActiveInactive: builder.mutation({
      query: ({ categoryId, body }: { categoryId: any; body: any }) => {
        return {
          url: `/product-category/active-inactive/${categoryId}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["productCategory", "productCategoryNameListData"] : [];
      },
    }),

    //product-category/name-list/dropdown
    productCategoryNameListData: builder.query({
      query: (params: any) => ({
        url: "/product-category/name-list/dropdown",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["productCategoryNameListData"],
    }),
  }),
});

export const {
  useGetProductCategoryQuery,
  useCreateProductCategoryMutation,
  useProductCategoryUpdateMutation,
  useProductCategoryDeleteMutation,
  useProductCategoryActiveInactiveMutation,

  // ================================
  useProductCategoryNameListDataQuery,
  useLazyProductCategoryNameListDataQuery,
} = productCategory_api_Slice;
