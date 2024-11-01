import { apiSlice } from "../../api/apiSlice";

const locations_api_slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    //divisions
    getDivisionList: builder.query({
      query: (params: any) => ({
        url: "/divisions/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
    }),
    //districts
    getDistrictList: builder.query({
      query: (params: any) => ({
        url: "/districts/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
    }),
    // upazilas
    getUpazilaList: builder.query({
      query: (params: any) => ({
        url: "/upazilas/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
    }),
    // unions
    getUnionList: builder.query({
      query: (params: any) => ({
        url: "/unions/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
    }),
  }),
});

export const {
  useGetDivisionListQuery,
  useGetDistrictListQuery,
  useGetUpazilaListQuery,
  useGetUnionListQuery,

  //lazy
  useLazyGetDivisionListQuery,
  useLazyGetDistrictListQuery,
  useLazyGetUpazilaListQuery,
  useLazyGetUnionListQuery,
} = locations_api_slice;

export default locations_api_slice;
