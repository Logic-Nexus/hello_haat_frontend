import { useMemo } from "react";
import { CButton } from "../../../Utils";
import { IoAddCircle } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import MainCard from "../../../Utils/CCard/MainCard";
import { Show } from "easy-beauty-components---react";
import { themeColor } from "../../../constant";
import MainTable from "../../../Utils/MainTable/MainTable";

const Expenses = () => {

  const data: any = [{ expenseName: "Purchase coffee cup", cost: "750", detail:  "Rise coffee cup", category: "Others", date: "31-12-2024"}, { expenseName: "Salary", cost: "12000", detail:  "August 24, Salary Pay", category: "Bills and Salary", date: "24-12-2024"}];

  const tableData = useMemo(() => {
    if (true) {
      return data.map((item: any) => {
        return {
            expenseName: item.expenseName,
            cost: item.cost,
            detail: item.detail,
            category: item.category,
            date: item?.date,
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
  }, []);

  

  return (
    <>
      <MainCard
        title="Expenses"
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
          when={data}
        //   FallBack={
        //     <>
        //       {isLoading ? (
        //         <Loader />
        //       ) : (
        //         <p className="text-center">No Data Found</p>
        //       )}
        //     </>
        //   }
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
          {/* <Show when={data?.data?.totalPages > 1}>
            <CPagination
              currentPage={data?.data?.currentPage}
              totalPages={data?.data?.totalPages}
              data={data?.data}
              handlePageChange={function (newPage: number): void {
                // console.log(newPage);
                setCurrentPage(newPage);
              }}
            />
          </Show> */}
        </Show>

        {/* Fullscreen Image Modal */}

        {/* <FullViewImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        /> */}
      </MainCard>
    </>
  );
};

export default Expenses;