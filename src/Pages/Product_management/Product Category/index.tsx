import { useCallback, useEffect, useMemo, useState } from "react";
import MainCard from "../../../Utils/CCard/MainCard";
import {
  CButton,
  CModal,
  CPagination,
  CSelect,
  CSkeleton,
} from "../../../Utils";
import { IoAddCircle } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useGetProductCategoryQuery,
  useProductCategoryActiveInactiveMutation,
  useProductCategoryDeleteMutation,
} from "../../../Store/feature/Product_management/ProductCategory/ProductCategory_api_slice";
import { themeColor } from "../../../constant";
import { Show } from "easy-beauty-components---react";
import { FaTrashCan } from "react-icons/fa6";
import { useAppDispatch } from "../../../Store/Store";
import { setSelectSingleProductCategory } from "../../../Store/feature/Product_management/ProductCategory/productCategory_slice";
import EditProductCategory from "./EditProductCategory/EditProductCategory";
import { warningAlert } from "../../../Utils/alert-function";
import ToggleSwitch from "../../../Utils/ToggleSwitch/ToggleSwitch";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";
import MainTable from "../../../Utils/MainTable/MainTable";
import { cToastify } from "../../../Shared";

const Product_category = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteId, setDeleteId] = useState<any>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState<string>("ACTIVE");

  // ==================== get product category ====================
  const {
    data: productCategoryData,
    isLoading,
    isFetching,
    // isError,
    isSuccess,
  } = useGetProductCategoryQuery(
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
  const [productCategoryDelete, { isLoading: isLoadingDelete }] =
    useProductCategoryDeleteMutation();

  const handleDelete = useCallback(
    async (id: any) => {
      warningAlert({
        text: "Are you sure you want to delete this product category?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDeleteId(id);
          try {
            const res = await productCategoryDelete({
              categoryId: id,
            }).unwrap();
            if (res) {
              cToastify({
                type: "success",
                message: "Product Category Deleted Successfully",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    [productCategoryDelete]
  );

  //handleToggleStatus

  // ==================== active inactive product category ====================
  const [productCategoryActiveInactive, { isSuccess: isActiveSuccess }] =
    useProductCategoryActiveInactiveMutation();

  useEffect(() => {
    if (isActiveSuccess) {
      cToastify({
        type: "success",
        message: "Product Category Status Updated Successfully",
      });
    }
  }, [isActiveSuccess]);

  const handleToggleStatus = useCallback(
    async (id: any, status: any) => {
      warningAlert({
        text: `Are you sure you want to ${
          status === "ACTIVE" ? "Inactive" : "Active"
        } this product category?`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await productCategoryActiveInactive({
              categoryId: id,
              body: { status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    [productCategoryActiveInactive]
  );

  //==================== table data ======================
  const tableData = useMemo(() => {
    if (isSuccess) {
      return productCategoryData?.data?.results?.map((item: any) => {
        return {
          Category_name: item.product_category_name,
          description: item.description,
          image: item.image?.url ? (
            <section className="flex items-center justify-center">
              <img
                src={item.image?.url}
                alt="product image"
                loading="lazy"
                style={{ width: "60px", height: "60px", objectFit: "cover" }}
              />
            </section>
          ) : (
            <>No Image</>
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
                  dispatch(setSelectSingleProductCategory(item));
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
    productCategoryData?.data,
    deleteId,
    isLoadingDelete,
    dispatch,
    handleDelete,
    handleToggleStatus,
  ]);

  // console.log(tableData);
  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${productCategoryData?.data?.results?.length}/${productCategoryData?.data?.count})`
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
    navigate("/vendor/product_category/create_product_category");
  };

  return (
    <MainCard
      title={`All Product Category ${showCountInData}`}
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
        when={!isFetching && tableData?.length > 0}
        FallBack={
          <>
            {isFetching ? (
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
        <Show when={productCategoryData?.data?.totalPages > 1}>
          <CPagination
            currentPage={productCategoryData?.data?.currentPage}
            totalPages={productCategoryData?.data?.totalPages}
            data={productCategoryData?.data}
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
        title="Edit Product Category"
      >
        <EditProductCategory onClose={() => setOpenEditModal(false)} />
      </CModal>
    </MainCard>
  );
};

export default Product_category;
