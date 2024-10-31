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
        return result ? ["productCategory"] : [];
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
        return result ? ["productCategory"] : [];
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
        return result ? ["productCategory"] : [];
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
        return result ? ["productCategory"] : [];
      },
    }),
  }),
});

export const {
  useGetProductCategoryQuery,
  useCreateProductCategoryMutation,
  useProductCategoryUpdateMutation,
  useProductCategoryDeleteMutation,
  useProductCategoryActiveInactiveMutation,
} = productCategory_api_Slice;
