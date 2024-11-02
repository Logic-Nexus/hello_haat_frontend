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
      invalidatesTags: (result: any) => {
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

    //update product category
    employeeUpdate: builder.mutation({
      query: ({ employeeId, body }: { employeeId: any; body: any }) => {
        return {
          url: `/employee-update/${employeeId}`,
          method: "PUT",
          body: body,
        };
      },

      invalidatesTags: (result: any) => {
        return result ? ["employees"] : [];
      },
      // employees-role/short-list?role=OPERATOR
    }),

    getEmployeeByRole: builder.query({
      query: (role: string) => ({
        url: "/employees-role/short-list",
        method: "GET",
        params: {
          role: role,
        },
      }),
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByRoleQuery,
  useEmployeeUpdateMutation,
  //lazy
  useLazyGetAllEmployeesQuery,
  useLazyGetEmployeeByRoleQuery,
} = employee_Api_Slice;
