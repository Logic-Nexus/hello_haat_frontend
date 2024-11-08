import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { APIURL } from "../../Base";
import { errorAlert } from "../../Utils/alert-function";
import { cToastify } from "../../Shared";
import { decryptData } from "../../constant/encrytion";
import Swal from "sweetalert2";
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

  let count = 0;

  if (result?.meta?.response?.status === 401) {
    // api.dispatch(logOut());

    if (count > 1) {
      localStorage.setItem("userData", JSON.stringify({}));
      window.location.reload();
      count = 0;
      return;
    } else {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please login again",
      }).then(() => {
        localStorage.setItem("userData", JSON.stringify({}));
        window.location.reload();
        count++;
        return;
      });
    }

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
  tagTypes: [
    "productCategory",
    "customers",
    "products",
    "productImages",
    "productCategoryNameListData",
    "Supplier",
    "product-purchase",
    "product-stock-report",
    "orderList",
  ],
  refetchOnReconnect: true,
}) as any;
