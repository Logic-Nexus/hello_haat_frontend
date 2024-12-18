import { useCallback, useMemo, useState } from "react";
import { CButton, CPagination, CSkeleton } from "../../../Utils";
// import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import MainCard from "../../../Utils/CCard/MainCard";
import { Show } from "easy-beauty-components---react";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";
import MainTable from "../../../Utils/MainTable/MainTable";
import { themeColor } from "../../../constant";
import {
  useDeleteProductPurchaseMutation,
  useGetProductPurchaseQuery,
} from "../../../Store/feature/Product_management/PurchaseProduct/PurchaseProduct_api_slice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { warningAlert } from "../../../Utils/alert-function";
import { cToastify } from "../../../Shared";
// import { setSelectSingleProductPurchase } from "../../../Store/feature/Product_management/PurchaseProduct/purchaseSlice";

const PurchaseProduct = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteId, setDeleteId] = useState<any>();

  const {
    data: productPurchaseData,
    isSuccess,
    isLoading,
    // isFetching,
  } = useGetProductPurchaseQuery(
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

  // ==================== delete  ====================

  const [deleteProductPurchase, { isLoading: isLoadingDelete }] =
    useDeleteProductPurchaseMutation();

  const handleDelete = useCallback(
    async (id: any) => {
      warningAlert({
        text: "Are you sure you want to delete this purchase?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDeleteId(id);
          try {
            const res = await deleteProductPurchase({
              productPurchaseId: id,
            }).unwrap();
            if (res.status === 200) {
              cToastify({
                type: "success",
                message: "Purchase Deleted Successfully",
              });
            }
          } catch (error: any) {
            console.log(error);
            if (error?.data?.status === 400) {
              cToastify({
                type: "error",
                message: error?.data?.message,
              });
            }
          }
        }
      });
    },
    [deleteProductPurchase]
  );

  //==================== table data ======================
  const tableData = useMemo(() => {
    if (isSuccess) {
      return productPurchaseData?.data?.results?.map((item: any) => {
        return {
          purchase_id: item.purchaseUniqueId,
          purchase_date: moment(item.purchase_date).format(
            "DD-MM-YYYY hh:mm A"
          ),
          product: (
            <span className="flex justify-start flex-col">
              {item.product?.product_name}
              <small className="font-bold">
                ({item.product?.product_code})
              </small>
            </span>
          ),
          operator: (
            <span className="flex justify-start flex-col ">
              {item?.zone?.operator?.fullName}
              <small className="font-bold">
                ({item?.zone?.operator?.employeeID})
              </small>
            </span>
          ),
          quantity: (
            <span className="flex justify-center">
              {item?.product_quantity}
            </span>
          ),
          cost: (
            <span className="flex justify-center">
              {item?.product_purchase_price}
            </span>
          ),
          retail: (
            <span className="flex justify-center">
              {item?.product_retail_price}
            </span>
          ),
          sell: (
            <span className="flex justify-center">
              {item?.product_selling_price}
            </span>
          ),

          old_MRP: (
            <span className="flex justify-center">{item?.product_old_mrp}</span>
          ),
          special_offer: (
            <span className="flex justify-center">{item?.special_offer}</span>
          ),
          supplier: (
            <span className="flex justify-start flex-col ">
              {item?.supplier?.supplierName}
              <small className="font-bold">
                ({item?.supplier?.supplierUniqueId})
              </small>
            </span>
          ),
          action: (
            <section className="flex items-center justify-center space-x-2">
              {/* <CButton
                variant="contained"
                circle
                tooltip
                id="tooltip-edit"
                tooltipContent="Edit Product Purchase"
                tooltipPosition="top-end"
                className="w-8 h-8"
                onClick={() => {
                  dispatch(setSelectSingleProductPurchase(item));
                  setOpenEditModal(true);
                }}
              >
                <section className="text-md">
                  <MdEdit />
                </section>
              </CButton> */}
              <CButton
                variant="contained"
                circle
                color="bg-red-500 text-white dark:bg-red-600 dark:text-white hover:bg-red-700 dark:hover:bg-red-800"
                tooltip
                id="tooltip-delete"
                tooltipContent="Delete Product Category"
                tooltipPosition="right"
                className="w-8 h-8"
                onClick={() => handleDelete(item?.id)}
                loading={
                  deleteId === item?.id && isLoadingDelete ? true : false
                }
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
  }, [
    deleteId,
    handleDelete,
    isLoadingDelete,
    isSuccess,
    productPurchaseData?.data?.results,
  ]);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${productPurchaseData?.data?.results?.length}/${productPurchaseData?.data?.count})`
    : "";

  const handleNavigateToProductPurchaseForm = () => {
    navigate("/vendor/purchase/purchase_product");
  };

  return (
    <MainCard
      title={`All Purchase Products ${showCountInData}`}
      //   filter={<section className="md:block hidden">{filterSection()}</section>}
      secondary={
        <>
          <CButton
            variant="solid"
            color="text-primary"
            tooltip
            id="tooltip"
            tooltipContent="Create Product Purchase"
            tooltipPosition="top-end"
            onClick={handleNavigateToProductPurchaseForm}
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
            {isLoading ? (
              // <Loader />
              <CSkeleton />
            ) : (
              <NotFoundData title="Product Purchase" />
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
        <Show when={productPurchaseData?.data?.totalPages > 1}>
          <CPagination
            currentPage={productPurchaseData?.data?.currentPage}
            totalPages={productPurchaseData?.data?.totalPages}
            data={productPurchaseData?.data}
            handlePageChange={function (newPage: number): void {
              // console.log(newPage);
              setCurrentPage(newPage);
            }}
          />
        </Show>
      </Show>

      {/* //edit modal  */}

      {/* <CModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Purchase Product"
      >
        <EditProductPurchase
          setOpenEditModal={setOpenEditModal}
          openEditModal={openEditModal}
        />
      </CModal> */}
    </MainCard>
  );
};

export default PurchaseProduct;
