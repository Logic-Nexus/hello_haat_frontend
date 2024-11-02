import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCustomersQuery } from "../../../Store/feature/UserManagement/Customer_Slice/Customer_Api_Slice";
import { CButton, CPagination, CSkeleton } from "../../../Utils";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import MainCard from "../../../Utils/CCard/MainCard";
import { IoAddCircle } from "react-icons/io5";
import { Show } from "easy-beauty-components---react";
import { themeColor } from "../../../constant";
import MainTable from "../../../Utils/MainTable/MainTable";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";

const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  //   Get All Customers
  const {
    data: customerData,
    isLoading,
    // isError,
    isFetching,
    isSuccess,
  } = useGetAllCustomersQuery(
    { pagination: true, pageNumber: currentPage },
    { refetchOnReconnect: true }
  );

  const tableData = useMemo(() => {
      if (isSuccess) {
        return customerData?.data?.results.map((item: any) => {
      return {
        userUniqueId: item.userUniqueId,
        profile_picture: item.profile_picture?.url ? (
          <section className="flex items-center justify-center">
            <img
              src={item.profile_picture?.url}
              alt="profile-picture"
              loading="lazy"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
          </section>
        ) : (
          <>No Image</>
        ),
        fullName: item?.firstName + " " + item?.lastName,
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
                tooltipContent="Delete Product Category"
                tooltipPosition="right"
                className="w-8 h-8"
              >
                <section className="text-md">
                  <FaTrashCan />
                </section>
              </CButton>
            </section>
          ),
      }
        })
      }
      return [];
  }, [
    isSuccess,
    customerData?.data
  ])
  return (
    <MainCard
      title="Customers"
      secondary={
        <>
          <CButton
            variant="solid"
            color="text-primary"
            tooltip
            id="tooltip"
            tooltipContent="Create Product Category"
            tooltipPosition="top-end"
            onClick={() => navigate("/user-management/customers/createCustomer")}
          >
            <IoAddCircle size={30} />
          </CButton>
        </>
      }
    >
        {/* table section */}
      <Show
        when={!isLoading && tableData?.length > 0}
        FallBack={
          <>
            {isFetching || isLoading ? (
              // <Loader />
              <CSkeleton />
            ) : (
              <NotFoundData title="Customers" />
            )}
          </>
        }
      >
        <section className="max-h-[calc(100vh-280px)] overflow-y-scroll">
          <MainTable
            data={tableData || []}
            filter={tableData || []}
            tableHeaderDesign={{
              backgroundColor: themeColor?.primary,
              color: themeColor?.light_text_color,
            }}
            dense
          />
        </section>

        {/* pagination section */}
        <Show when={customerData?.data?.totalPages > 1}>
          <CPagination
            currentPage={customerData?.data?.currentPage}
            totalPages={customerData?.data?.totalPages}
            data={customerData?.data}
            handlePageChange={function (newPage: number): void {
              // console.log(newPage);
              setCurrentPage(newPage);
            }}
          />
        </Show>
      </Show>
    </MainCard>
  );
};
export default Customers;
