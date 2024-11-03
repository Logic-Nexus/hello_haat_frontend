
import { Show } from "easy-beauty-components---react";
import { CButton, CModal, CPagination, CSkeleton } from "../../../Utils";
import MainCard from "../../../Utils/CCard/MainCard";
import { IoAddCircle } from "react-icons/io5";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";
import MainTable from "../../../Utils/MainTable/MainTable";
import { themeColor } from "../../../constant";
import { MdFullscreen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../../Store/Store";
import { useMemo, useState } from "react";
import { useGetAllSuppliersQuery } from "../../../Store/feature/UserManagement/Supplier/supplier_api_slice";
import { FaTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import FullViewImage from "../../../Components/FullViewImage/FullViewImage";

const Suppliers = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  // const [deleteId, setDeleteId] = useState<any>();
  const [status] = useState<string>("ACTIVE");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    data: suppliersList,
    // isLoading,
    isFetching,
    isSuccess,
  } = useGetAllSuppliersQuery(
    {
      status: status,
      pagination: true,
      pageNumber: currentPage,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
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
  }, [suppliersList?.data?.results, isSuccess]);

  console.log("suppliersList", tableData);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${suppliersList?.data?.results?.length}/${suppliersList?.data?.count})`
    : "";

  // ==================== handle navigate to create supplier form =================
  const handleNavigateToCreateSupplierForm = () => {
    navigate("/vendor/suppliers/createSupplier");
  };

  return (
    <MainCard
      title={`Suppliers List ${showCountInData}`}
      // filter={<section className="md:block hidden">{filterSection()}</section>}
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

