import { useMemo, useState } from "react";
import MainCard from "../../../Utils/CCard/MainCard";
import { CModal, CPagination, CSkeleton } from "../../../Utils";
import { Show } from "easy-beauty-components---react";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";
import MainTable from "../../../Utils/MainTable/MainTable";
import { themeColor } from "../../../constant";
// import { MdEdit } from "react-icons/md";
// import { FaTrashCan } from "react-icons/fa6";
// import { IoAddCircle } from "react-icons/io5";
import moment from "moment";
import { useGetProductPurchaseStockReportQuery } from "../../../Store/feature/Reports/stockReport/stockReport_api_slice";

const StockReport = () => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: productPurchaseStockReportData,
    isSuccess,
    isFetching,
  } = useGetProductPurchaseStockReportQuery(
    {
      //   status: status,
      pagination: true,
      pageNumber: currentPage,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  //==================== table data ======================
  const tableData = useMemo(() => {
    if (isSuccess) {
      return productPurchaseStockReportData?.data?.results?.map((item: any) => {
        return {
          purchase_id: item.product_stock_purchase?.purchaseUniqueId,
          create_date: moment(item.createdAt).format("DD-MM-YYYY hh:mm A"),
          update_date: moment(item.updatedAt).format("DD-MM-YYYY hh:mm A"),
          product: (
            <span className="flex justify-start flex-col">
              {item.product?.product_name}
              <small className="font-bold">
                ({item.product?.product_code})
              </small>
            </span>
          ),
          zone: (
            <span className="flex justify-start flex-col">
              {item.zone?.zone_name}
              <small className="font-bold">
                Operator: {item.zone?.operator?.employeeID}
              </small>
            </span>
          ),

          stock: (
            <span className="flex justify-center">{item?.product_stock}</span>
          ),
          cost: (
            <span className="flex justify-center">
              {item?.product_purchase_price}
            </span>
          ),

          sell: (
            <span className="flex justify-center">
              {item?.product_selling_price}
            </span>
          ),
          sold: (
            <span className="flex justify-center">
              {item?.product_sold_quantity}
            </span>
          ),
          total_sold: (
            <span className="flex justify-center">
              {item?.product?.product_inventory?.quantitySold}
            </span>
          ),

          // action: (
          //   <section className="flex items-center justify-center space-x-2">
          //     <CButton
          //       variant="contained"
          //       circle
          //       tooltip
          //       id="tooltip-edit"
          //       tooltipContent="Edit Product Category"
          //       tooltipPosition="top-end"
          //       className="w-8 h-8"
          //       onClick={() => {
          //         //   dispatch(setSelectSingleProduct(item));
          //         //   setOpenEditModal(true);
          //       }}
          //     >
          //       <section className="text-md">
          //         <MdEdit />
          //       </section>
          //     </CButton>
          //     <CButton
          //       variant="contained"
          //       circle
          //       color="bg-red-500 text-white dark:bg-red-600 dark:text-white hover:bg-red-700 dark:hover:bg-red-800"
          //       tooltip
          //       id="tooltip-delete"
          //       tooltipContent="Delete Product Category"
          //       tooltipPosition="right"
          //       className="w-8 h-8"
          //       // onClick={() => handleDelete(item?.id)}
          //       // loading={
          //       //   deleteId === item?.id && isLoadingDelete ? true : false
          //       // }
          //     >
          //       <section className="text-md">
          //         <FaTrashCan />
          //       </section>
          //     </CButton>
          //   </section>
          // ),
        };
      });
    }
    return [];
  }, [isSuccess, productPurchaseStockReportData?.data]);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${productPurchaseStockReportData?.data?.results?.length}/${productPurchaseStockReportData?.data?.count})`
    : "";

  return (
    <MainCard
      title={`All Stock  ${showCountInData}`}
      //   filter={<section className="md:block hidden">{filterSection()}</section>}
    >
      {/* table section */}
      <Show
        when={!isFetching && tableData?.length > 0}
        FallBack={
          <>
            {isFetching ? (
              // <Loader />
              <CSkeleton />
            ) : (
              <NotFoundData title="Stock" />
            )}
          </>
        }
      >
        <section className="max-h-[calc(100vh-290px)] overflow-y-scroll">
          <MainTable
            data={tableData || []}
            filter={tableData || []}
            tableHeaderDesign={{
              backgroundColor: themeColor?.primary,
              color: themeColor?.light_text_color,
            }}
            dense
            // sticky
            // bulkSelection
            // checked
            // onSelectAllClick={() => console.log("Selected All")}
          />
        </section>

        {/* pagination section */}
        <Show when={productPurchaseStockReportData?.data?.totalPages > 1}>
          <CPagination
            currentPage={productPurchaseStockReportData?.data?.currentPage}
            totalPages={productPurchaseStockReportData?.data?.totalPages}
            data={productPurchaseStockReportData?.data}
            handlePageChange={function (newPage: number): void {
              // console.log(newPage);
              setCurrentPage(newPage);
            }}
          />
        </Show>
      </Show>

      {/* //edit modal  */}

      <CModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Stock Report"
      >
        {/* <EditProducts
          setOpenEditModal={setOpenEditModal}
          openEditModal={openEditModal}
        /> */}
      </CModal>
    </MainCard>
  );
};

export default StockReport;
