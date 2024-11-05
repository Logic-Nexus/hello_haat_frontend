import { useMemo, useState } from "react";
import { CButton, CInput, CPagination, CSelect } from "../../../Utils";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../../Store/feature/UserManagement/Employee_Slice/Employee_Api_Slice";
import { IoAddCircle } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import MainCard from "../../../Utils/CCard/MainCard";
import { Show } from "easy-beauty-components---react";
import Loader from "../../../Shared/Loader/Loader";
import { themeColor } from "../../../constant";
import MainTable from "../../../Utils/MainTable/MainTable";
import { useAppDispatch } from "../../../Store/Store";
import { setSelectSingleEmployee } from "../../../Store/feature/UserManagement/Employee_Slice/Employee_Slice";
import { FaSearch } from "react-icons/fa";

const Employees = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<string>("");
  const [employeeID, setEmployeeID] = useState<string | null>(null);
  const [role, setRole] = useState("");

  const { data, isLoading, isSuccess, isFetching } = useGetAllEmployeesQuery(
    { status: "ACTIVE", ...(employeeID && { employeeUniqueID: employeeID }), pagination: true, pageNumber: currentPage, role },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );
  // console.log("data", data?.data?.results);

  const tableData = useMemo(() => {
    if (isSuccess) {
      return data?.data?.results.map((item: any) => {
        return {
          employee_id: item.employeeID,
          profile_picture: item?.profile_picture?.url ? (
            <section className="flex items-center justify-center">
              <img
                src={item?.profile_picture?.url}
                alt="profile-picture"
                loading="lazy"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            </section>
          ) : (
            <>No Image</>
          ),
          full_name: item.fullName,
          role: item.role,
          mobile: item?.user?.mobile || "-",
          email: item?.user?.email || "-",
          address: item?.address || "-",
          action: (
            <section className="flex items-center justify-center space-x-2">
              <CButton
                variant="contained"
                circle
                tooltip
                id="tooltip-edit"
                tooltipContent="Edit Product Category"
                tooltipPosition="top-end"
                className="w-8 h-8"
                onClick={() => {
                  dispatch(setSelectSingleEmployee(item));
                  navigate("/vendor/employees/editEmployee");
                }}
              >
                <section className="text-md">
                  <MdEdit />
                </section>
              </CButton>
              <CButton
                variant="contained"
                circle
                color="bg-red-500 text-white dark:bg-red-600 dark:text-white hover:bg-red-700 dark:hover:bg-red-800"
                tooltip
                id="tooltip-delete"
                className="w-8 h-8"
                tooltipContent="Delete Product Category"
                tooltipPosition="right"
              >
                <section className="text-md">
                  <FaTrashCan />
                </section>
              </CButton>
            </section>
          ),
        };
      });
    }
    return [];
  }, [data?.data?.results, dispatch, isSuccess, navigate]);

  // ==================== filter section ====================
  const filterSection = () => {
    return (
      <section className="flex items-center space-x-2">
        <CInput
          width="md:w-[200px] w-[100px]"
          placeholder="Search Employee"
          disabled={isLoading || isFetching}
          onChange={(e: any) => {
            if (e.target.value === "") {
              setEmployeeID("");
            }
            setSearch(e.target.value);
          }}
          value={search}
          id="search"
          endIcon={
            <FaSearch
              color={themeColor?.primary}
              className="cursor-pointer"
              onClick={() => {
                //before set search value remove space from start and end
                const regex = /^\s+|\s+$/g;
                const searchValue = search.replace(regex, "");
                setEmployeeID(searchValue);
                setCurrentPage(1);
              }}
            />
          }
        />

        <CSelect
          disabled={isLoading || isFetching}
          value={role}
          options={[
            { value: "OPERATOR", label: "Operator" },
            { value: "REPRESENTATIVE", label: "Representative" },
            { value: "RAIDER", label: "Rider" },
          ]}
          width="md:w-[200px] w-[100px]"
          classNamePrefix="Select Role"
          onChange={(e: any) => {
            setRole(e?.value);
          }}
        />
      </section>
    );
  };

  return (
    <>
      <MainCard
        title="All Employees"
        filter={<section className="md:block hidden">{filterSection()}</section>}
        secondary={
          <>
            <CButton
              variant="solid"
              color="text-primary"
              tooltip
              id="tooltip"
              tooltipContent="Create Product Category"
              tooltipPosition="top-end"
              onClick={() => navigate("/vendor/employees/createEmployee")}
            >
              <IoAddCircle size={30} />
            </CButton>
          </>
        }
      >
        {/* Table Section */}
        <Show
          when={!isLoading && tableData?.length > 0}
          FallBack={
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <p className="text-center">No Data Found</p>
              )}
            </>
          }
        >
          <section className="max-h-[calc(100vh-290px)] overflow-y-scroll">
            <MainTable
              data={tableData || []}
              dense
              filter={true}
              tableHeaderDesign={{
                backgroundColor: themeColor?.primary,
                color: themeColor?.light_text_color,
              }}
            />
          </section>

          {/* Pagination Section */}
          <Show when={data?.data?.totalPages > 1}>
            <CPagination
              currentPage={data?.data?.currentPage}
              totalPages={data?.data?.totalPages}
              data={data?.data}
              handlePageChange={function (newPage: number): void {
                // console.log(newPage);
                setCurrentPage(newPage);
              }}
            />
          </Show>
        </Show>
      </MainCard>
    </>
  );
};

export default Employees;
