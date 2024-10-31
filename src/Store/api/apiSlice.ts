/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { APIURL } from "../../Base";
import { errorAlert } from "../../Utils/alert-function";
import { cToastify } from "../../Shared";
import { decryptData } from "../../constant/encrytion";
// import {loginUserData} from '../feature/Auth_slice/Auth_slice';

const baseQuery = fetchBaseQuery({
  baseUrl: APIURL,
  prepareHeaders: async (headers) => {
    // if (!headers.get("Authorization")) {
    //   return headers;
    // }
    const token = decryptData("userData")?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include",
});

const baseQueryWithRetry = async (
  args: Parameters<typeof baseQuery>[0],
  api: Parameters<typeof baseQuery>[1],
  extraOptions: Parameters<typeof baseQuery>[2]
) => {
  const result = (await baseQuery(args, api, extraOptions)) as any;
  // console.log(result);
  if (result?.error?.status === 403) {
    return cToastify({
      type: "error",
      message: result?.error?.data?.message || "Forbidden",
    });
  } else if (result?.error?.status === 500) {
    return errorAlert({
      text: "Internal Server Error",
    });
  } else if (result.error?.originalStatus === 429) {
    return cToastify({
      type: "error",
      message: result?.error?.data || "Too Many Requests",
    });
  } else if (result?.error?.status === "FETCH_ERROR") {
    return cToastify({
      type: "error",
      message: "Network Error",
    });
  }
  // const dispatch = api.dispatch;
  // console.log(api);
  // console.log('result', result?.meta?.response?.status);
  else if (result?.meta?.response?.status === 401) {
    // api.dispatch(logOut());
    cToastify({
      type: "error",
      message: "Session Expired",
    });

    localStorage.setItem("userData", JSON.stringify({}));
    window.location.reload();

    return result;
  } else {
    return result;
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry as unknown as BaseQueryFn<
    unknown,
    unknown,
    unknown
  >,

  endpoints: (_build) => ({}),
  tagTypes: ["productCategory", "customers", "products", "productImages"],
  refetchOnReconnect: true,
}) as any;
