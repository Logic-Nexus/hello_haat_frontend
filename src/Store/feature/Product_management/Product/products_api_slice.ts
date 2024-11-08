import { apiSlice } from "../../../api/apiSlice";

export const product_api_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    getProducts: builder.query({
      query: (params: any) => ({
        url: "/products",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["products"],
    }),
    //create
    createProduct: builder.mutation({
      query: ({ body }: any) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: (result: any) => {
        return result ? ["products"] : [];
      },
    }),
    //update
    updateProduct: builder.mutation({
      query: ({ productId, body }: { productId: any; body: any }) => {
        return {
          url: `/products/${productId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result: any) => {
        return result ? ["products"] : [];
      },
    }),
    //delete
    deleteProduct: builder.mutation({
      query: ({ productId }: { productId: any }) => {
        return {
          url: `/products/single/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result: any) => {
        return result ? ["products"] : [];
      },
    }),

    productActiveInactiveStatus: builder.mutation({
      query: ({ productId, body }: { productId: any; body: any }) => {
        return {
          url: `/products/active-inactive/${productId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result: any) => {
        return result ? ["products"] : [];
      },
    }),

    //product images  ================================
    //get product images by product id
    getProductImagesByProductId: builder.query({
      query: (productId: any) => ({
        url: `/products/images/${productId}`,
        method: "GET",
      }),
      providesTags: ["productImages"],
    }),

    //delete product image
    deleteProductImage: builder.mutation({
      query: ({ imageId }: { imageId: any }) => {
        return {
          url: `/products/single-image/${imageId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result: any) => {
        return result ? ["productImages"] : [];
      },
    }),

    // products/image-status
    toggleImageActive: builder.mutation({
      query: ({ imageId, isActive }: { imageId: any; isActive: string }) => {
        return {
          url: `/products/image-status/${imageId}`,
          method: "PUT",
          body: {
            status: isActive,
          },
        };
      },
      invalidatesTags: (result: any) => {
        return result ? ["productImages"] : [];
      },
    }),

    //upload image products/create-image
    uploadProductImage: builder.mutation({
      query: ({ productId, body }: { productId: string; body: any }) => {
        return {
          url: `/products/create-image/${productId}`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: (result: any) => {
        return result ? ["productImages"] : [];
      },
    }),

    //products-name-list
    getProductsNameList: builder.query({
      query: ({ status }: any) => ({
        url: "products-name-list",
        method: "GET",
        params: {
          ...(status && {
            status,
          }),
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useProductActiveInactiveStatusMutation,

  // ================================ product images
  useGetProductImagesByProductIdQuery,
  useDeleteProductImageMutation,
  useToggleImageActiveMutation,
  useUploadProductImageMutation,

  //products-name-list
  useGetProductsNameListQuery,
  useLazyGetProductsNameListQuery,
} = product_api_Slice;
