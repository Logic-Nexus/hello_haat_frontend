import { employeeDataType } from "../../../../Types/employee_types";
import { apiSlice } from "../../../api/apiSlice";

export const employee_Api_Slice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createEmployee: builder.mutation({
      query: (employeeData: employeeDataType) => ({
        url: "/employee-register/",
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["employees"] : [];
      },
    }),

    getAllEmployees: builder.query({
      query: (params: any) => ({
        url: "/employees/",
        method: "GET",
        params: {
          ...(Object.keys(params)?.length > 0 && {
            ...params,
          }),
        },
      }),
      providesTags: ["employees"],
    }),
  }),
});

export const { useCreateEmployeeMutation, useGetAllEmployeesQuery } =
employee_Api_Slice;
