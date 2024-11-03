import { useMemo, useState } from "react";
import { CButton, CPagination } from "../../../Utils";
// import { useNavigate } from "react-router-dom";
// import { useGetAllEmployeesQuery } from "../../../Store/feature/UserManagement/Employee_Slice/Employee_Api_Slice";
import { IoAddCircle } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import MainCard from "../../../Utils/CCard/MainCard";
import { Show } from "easy-beauty-components---react";
import Loader from "../../../Shared/Loader/Loader";
import { themeColor } from "../../../constant";
import MainTable from "../../../Utils/MainTable/MainTable";
// import { useAppDispatch } from "../../../Store/Store";
import { useGetAllSuppliersQuery } from "../../../Store/feature/UserManagement/Supplier_Slice/Supplier_Api_Slice";

const Suppliers = () => {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess } = useGetAllSuppliersQuery(
    { pagination: true, pageNumber: currentPage },
    { refetchOnReconnect: true }
  );
  

  const tableData = useMemo(() => {
    if (isSuccess) {
      return data?.data?.results.map((item: any) => {
        return {
          supplier_id: item.supplierUniqueId,
          logo: item?.companyLogo?.url ? (
            <section className="flex items-center justify-center">
              <img
                src={item?.companyLogo?.url}
                alt="profile-picture"
                loading="lazy"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            </section>
          ) : (
            <>No Image</>
          ),
          supplier_name: item?.supplierName,
          SR_name: item?.srName,
          SR_mobile: item?.srContactNo,
          dealer_email: item?.dealerEmail,
          dealer_address: item?.dealerAddress,
          action: (
            <section className="flex items-center justify-center space-x-2">
              <CButton
                variant="contained"
                circle
                tooltip
                id="tooltip-edit"
                tooltipContent="Edit Product Category"
                tooltipPosition="top-end"
              >
                <MdEdit />
              </CButton>
              <CButton
                variant="contained"
                circle
                color="bg-red-500 text-white dark:bg-red-600 dark:text-white hover:bg-red-700 dark:hover:bg-red-800"
                tooltip
                id="tooltip-delete"
                tooltipContent="Delete Product Category"
                tooltipPosition="right"
              >
                <FaTrashCan />
              </CButton>
            </section>
          ),
        };
      });
    }
    return [];
  }, [data?.data?.results, isSuccess]);

  return (
    <div className="container mx-auto">
      <MainCard
        title="All Suppliers"
        secondary={
          <>
            <CButton
              variant="solid"
              color="text-primary"
              tooltip
              id="tooltip"
              tooltipContent="Create Product Category"
              tooltipPosition="top-end"
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
          <section className="max-h-[calc(100vh-200px)] overflow-y-scroll">
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
    </div>
  );
};

export default Suppliers;

