import { Show } from "easy-beauty-components---react";
import {
  CButton,
  CInput,
  CModal,
  CPagination,
  CSelect,
  CSkeleton,
} from "../../../Utils";
import MainCard from "../../../Utils/CCard/MainCard";
import { IoAddCircle } from "react-icons/io5";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";
import MainTable from "../../../Utils/MainTable/MainTable";
import { themeColor } from "../../../constant";
import { MdFullscreen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useCallback, useMemo, useState } from "react";
import {
  useDeleteSupplierMutation,
  useGetAllSuppliersQuery,
  useSupplierActiveInactiveStatusMutation,
} from "../../../Store/feature/UserManagement/Supplier/supplier_api_slice";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import FullViewImage from "../../../Components/FullViewImage/FullViewImage";
import { warningAlert } from "../../../Utils/alert-function";
import { cToastify } from "../../../Shared";
import ToggleSwitch from "../../../Utils/ToggleSwitch/ToggleSwitch";

const Suppliers = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [status, setStatus] = useState<string>("ACTIVE");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [supplierUniqueId, setSupplierUniqueId] = useState<string | null>(null);

  const {
    data: suppliersList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetAllSuppliersQuery(
    {
      status: status,
      ...(supplierUniqueId && { supplierUniqueId }),
      pagination: true,
      pageNumber: currentPage,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  // ==================== active inactive product category ====================
  const [supplierActiveInactiveStatus] =
    useSupplierActiveInactiveStatusMutation();

  const handleToggleStatus = useCallback(
    async (id: any, status: any) => {
      warningAlert({
        text: `Are you sure you want to ${
          status === "ACTIVE" ? "Inactive" : "Active"
        } this Supplier?`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await supplierActiveInactiveStatus({
              supplierId: id,
              body: { status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
            }).unwrap();
            if (res?.status === 200) {
              cToastify({
                type: "success",
                message: `Supplier ${
                  status === "ACTIVE" ? "Inactive" : "Active"
                } Successfully`,
              });
            }
          } catch (error: any) {
            console.log(error);
            if (error?.status === 400) {
              cToastify({
                type: "error",
                message:
                  error?.data?.message ||
                  `Supplier ${
                    status === "ACTIVE" ? "Inactive" : "Active"
                  } Failed`,
              });
            }
          }
        }
      });
    },
    [supplierActiveInactiveStatus]
  );

  // ==================== delete product category ====================
  const [deleteSupplier, { isLoading: isLoadingDelete }] =
    useDeleteSupplierMutation();

  const handleDelete = useCallback(
    async (id: any) => {
      warningAlert({
        text: "Are you sure you want to delete this supplier?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDeleteId(id);
          try {
            const res = await deleteSupplier({
              supplierId: id,
            }).unwrap();
            if (res.status === 200) {
              cToastify({
                type: "success",
                message: "Supplier Deleted Successfully",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    [deleteSupplier]
  );

  const tableData = useMemo(() => {
    if (isSuccess) {
      return suppliersList?.data?.results?.map((item: any) => {
        // console.log("item", item);
        return {
          supplierId: item.supplierUniqueId,
          supplierName: item.supplierName,
          srName: item.srName,
          srContactNo: item.srContactNo,
          srWhatsappNo: item.srWhatsappNo,
          dealerName: item.dealerName,
          dealerContactNo: item.dealerContactNo,
          dealerEmail: item.dealerEmail,
          dealerAddress: item.dealerAddress,
          companyLogo: item?.companyLogo?.url ? (
            <section className="flex items-center justify-center relative">
              <img
                src={item?.companyLogo?.url}
                alt="Product Image"
                className="lg:w-20 lg:h-20 w-10 h-10 object-contain rounded shadow-md cursor-pointer"
                onClick={() => setSelectedImage(item.companyLogo?.url)}
              />
              {/* //full screen icon  */}
              <div className="absolute top-0 right-0 p-2 md:block hidden">
                <MdFullscreen
                  className="text-2xl cursor-pointer"
                  onClick={() => setSelectedImage(item.companyLogo?.url)}
                />
              </div>
            </section>
          ) : (
            <>No Image</>
          ),
          srPhoto: item?.srPhoto?.url ? (
            <section className="flex items-center justify-center relative">
              <img
                src={item?.srPhoto?.url}
                alt="Product Image"
                className="lg:w-20 lg:h-20 w-10 h-10 object-contain rounded shadow-md cursor-pointer"
                onClick={() => setSelectedImage(item.srPhoto?.url)}
              />
              {/* //full screen icon  */}
              <div className="absolute top-0 right-0 p-2 md:block hidden ">
                <MdFullscreen
                  className="text-2xl cursor-pointer"
                  onClick={() => setSelectedImage(item.srPhoto?.url)}
                />
              </div>
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
                  // dispatch(setSelectSingleEmployee(item));
                  // navigate("/vendor/employees/editEmployee");
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
    suppliersList?.data?.results,
    deleteId,
    isLoadingDelete,
    handleToggleStatus,
    handleDelete,
  ]);

  // console.log("suppliersList", tableData);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${suppliersList?.data?.results?.length}/${suppliersList?.data?.count})`
    : "";

  // ==================== filter section ====================
  const filterSection = () => {
    return (
      <section className="flex items-center space-x-2">
        <CInput
          width="md:w-[200px] w-[100px]"
          placeholder="Search Supplier"
          disabled={isLoading || isFetching}
          onChange={(e: any) => {
            if (e.target.value === "") {
              setSupplierUniqueId("");
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
                setSupplierUniqueId(searchValue);
                setCurrentPage(1);
              }}
            />
          }
        />

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
          width="md:w-[200px] w-[100px]"
          classNamePrefix="Select Status"
          onChange={(e: any) => {
            setStatus(e?.value);
          }}
        />
      </section>
    );
  };

  // ==================== handle navigate to create supplier form =================
  const handleNavigateToCreateSupplierForm = () => {
    navigate("/vendor/suppliers/createSupplier");
  };

  return (
    <MainCard
      title={`Suppliers List ${showCountInData}`}
      filter={<section className="md:block hidden">{filterSection()}</section>}
      secondary={
        <>
          <CButton
            variant="solid"
            color="text-primary"
            tooltip
            id="tooltip"
            tooltipContent="Create Supplier"
            tooltipPosition="top-end"
            onClick={handleNavigateToCreateSupplierForm}
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
              <NotFoundData title="Suppliers" />
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
        <Show when={suppliersList?.data?.totalPages > 1}>
          <CPagination
            currentPage={suppliersList?.data?.currentPage}
            totalPages={suppliersList?.data?.totalPages}
            data={suppliersList?.data}
            handlePageChange={function (newPage: number): void {
              // console.log(newPage);
              setCurrentPage(newPage);
            }}
          />
        </Show>
      </Show>

      {/* Fullscreen Image Modal */}

      <FullViewImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      {/* //edit modal section */}
      <CModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Zone"
        width="max-w-2xl"
        height="container"
      >
        {/* <EditZone
          setOpenEditModal={setOpenEditModal}
          openEditModal={openEditModal}
        /> */}
      </CModal>
    </MainCard>
  );
};

export default Suppliers;
