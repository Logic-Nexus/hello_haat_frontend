import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Store/Store";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useProductActiveInactiveStatusMutation,
} from "../../../Store/feature/Product_management/Product/products_api_slice";
import { IoAddCircle } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import ToggleSwitch from "../../../Utils/ToggleSwitch/ToggleSwitch";
import {
  CButton,
  CModal,
  CPagination,
  CSelect,
  CSkeleton,
} from "../../../Utils";
import { warningAlert } from "../../../Utils/alert-function";
import { cToastify } from "../../../Shared";
import { Show } from "easy-beauty-components---react";
import MainCard from "../../../Utils/CCard/MainCard";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";
import MainTable from "../../../Utils/MainTable/MainTable";
import { themeColor } from "../../../constant";
import { FaImages } from "react-icons/fa6";
import { setSelectSingleProduct } from "../../../Store/feature/Product_management/Product/products_slice";
import ViewProductImages from "./ViewProductImages/ViewProductImages";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<any>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewImageModal, setViewImageModal] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("ACTIVE");

  // ==================== get product category ====================
  const {
    data: productsData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetProductsQuery(
    {
      status: status,
      pagination: true,
      pageNumber: currentPage,
    },
    {
      // refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
    }
  );

  // ==================== delete product category ====================
  const [deleteProduct, { isLoading: isLoadingDelete }] =
    useDeleteProductMutation();

  const handleDelete = useCallback(
    async (id: any) => {
      warningAlert({
        text: "Are you sure you want to delete this product?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDeleteId(id);
          try {
            const res = await deleteProduct({
              productId: id,
            }).unwrap();
            if (res) {
              cToastify({
                type: "success",
                message: "Product Deleted Successfully",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    [deleteProduct]
  );

  // ==================== active inactive product category ====================
  const [productActiveInactiveStatus, { isLoading: isActiveLoading }] =
    useProductActiveInactiveStatusMutation();

  const handleToggleStatus = useCallback(
    async (id: any, status: any) => {
      warningAlert({
        text: `Are you sure you want to ${
          status === "ACTIVE" ? "Inactive" : "Active"
        } this product category?`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await productActiveInactiveStatus({
              productId: id,
              body: { status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
            });
            cToastify({
              type: "success",
              message: `Product ${
                status === "ACTIVE" ? "Inactive" : "Active"
              } Successfully`,
            });
          } catch (error) {
            console.log(error);
            cToastify({
              type: "error",
              message: `Product ${
                status === "ACTIVE" ? "Inactive" : "Active"
              } Failed`,
            });
          }
        }
      });
    },
    [productActiveInactiveStatus]
  );

  //==================== table data ======================
  const tableData = useMemo(() => {
    if (isSuccess) {
      return productsData?.data?.results?.map((item: any) => {
        return {
          SKU: item.product_code,
          name: item.product_name,
          description: item.description,
          category: item.product_category?.product_category_name,
          quantity_type: (
            <span className="flex justify-center">
              {item?.product_quantity_type}
            </span>
          ),
          status: (
            <>
              <section className="flex items-center justify-center">
                <ToggleSwitch
                  isOn={item?.isActive === "ACTIVE" ? true : false}
                  onToggle={() => handleToggleStatus(item?.id, item?.isActive)}
                />
              </section>
            </>
          ),
          image: (
            <section className="flex items-center justify-center">
              <FaImages
                className="w-5 h-5 cursor-pointer"
                color={themeColor?.primary}
                onClick={() => {
                  dispatch(setSelectSingleProduct(item));
                  setViewImageModal(true);
                }}
              />
            </section>
          ),
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
                  dispatch(setSelectSingleProduct(item));
                  setOpenEditModal(true);
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
    isSuccess,
    productsData?.data,
    deleteId,
    isLoadingDelete,
    dispatch,
    handleDelete,
    handleToggleStatus,
  ]);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${productsData?.data?.results?.length}/${productsData?.data?.count})`
    : "";

  // ==================== filter section ====================
  const filterSection = () => {
    return (
      <>
        <CSelect
          disabled={isLoading || isFetching}
          defaultValue={
            status === "ACTIVE"
              ? { value: "ACTIVE", label: "Active" }
              : { value: "INACTIVE", label: "Inactive" }
          }
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "INACTIVE", label: "Inactive" },
          ]}
          width="md:w-[400px] w-[200px]"
          classNamePrefix="Select Status"
          onChange={(e: any) => {
            setStatus(e?.value);
          }}
        />
      </>
    );
  };

  // ==================== navigate to product category form ====================
  const handleNavigateToProductCategoryForm = () => {
    navigate("/vendor/products/create_product");
  };
  return (
    <MainCard
      title={`All Products ${showCountInData}`}
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
            onClick={handleNavigateToProductCategoryForm}
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
              <NotFoundData title="Category" />
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
            // sticky
            // bulkSelection
            // checked
            // onSelectAllClick={() => console.log("Selected All")}
          />
        </section>

        {/* pagination section */}
        <Show when={productsData?.data?.totalPages > 1}>
          <CPagination
            currentPage={productsData?.data?.currentPage}
            totalPages={productsData?.data?.totalPages}
            data={productsData?.data}
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
        title="Edit Product "
      >
        {/* <EditProductCategory onClose={() => setOpenEditModal(false)} /> */}
      </CModal>

      {/* //view image modal */}
      <CModal
        open={viewImageModal}
        onClose={() => setViewImageModal(false)}
        title="View Product Images"
        height="container"
        width="container"
      >
        <ViewProductImages />
      </CModal>
    </MainCard>
  );
};

export default Products;
