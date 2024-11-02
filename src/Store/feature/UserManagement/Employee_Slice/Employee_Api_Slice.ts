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

<<<<<<< HEAD
    //update product category
    employeeUpdate: builder.mutation({
      query: ({ employeeId, body }: { employeeId: any; body: any }) => {
        return {
          url: `/employee-update/${employeeId}`,
          method: "PUT",
          body: body,
        };
      },

      invalidatesTags: (result: any, error: any, body: any) => {
        return result ? ["employees"] : [];
      },
=======
    // employees-role/short-list?role=OPERATOR
    getEmployeeByRole: builder.query({
      query: (role: string) => ({
        url: "/employees-role/short-list",
        method: "GET",
        params: {
          role: role,
        },
      }),
>>>>>>> 0eb2c12df8c6da034c0b702b835f3615b3cbfed0
    }),
  }),
});

<<<<<<< HEAD
export const { useCreateEmployeeMutation, useGetAllEmployeesQuery, useEmployeeUpdateMutation } =
employee_Api_Slice;
=======
export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByRoleQuery,

  //lazy
  useLazyGetAllEmployeesQuery,
  useLazyGetEmployeeByRoleQuery,
} = employee_Api_Slice;
>>>>>>> 0eb2c12df8c6da034c0b702b835f3615b3cbfed0
