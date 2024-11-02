import React, { useCallback, useMemo, useState } from "react";
import MainCard from "../../../Utils/CCard/MainCard";
import { CButton, CPagination, CSkeleton } from "../../../Utils";
import { IoAddCircle } from "react-icons/io5";
import {
  useDeleteZoneMutation,
  useGetZoneListQuery,
  useUpdateZoneStatusMutation,
} from "../../../Store/feature/Zone/zone_api_slice";
import { Show } from "easy-beauty-components---react";
import NotFoundData from "../../../Components/NotFoundData/NotFoundData";
import MainTable from "../../../Utils/MainTable/MainTable";
import { themeColor } from "../../../constant";
import { useAppDispatch } from "../../../Store/Store";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../../../Utils/ToggleSwitch/ToggleSwitch";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { warningAlert } from "../../../Utils/alert-function";
import { cToastify } from "../../../Shared";

const Zone = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [status, setStatus] = useState<string>("ACTIVE");

  const {
    data: zoneList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetZoneListQuery(
    { status: status, pagination: true, pageNumber: currentPage },
    {
      //   refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
    }
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedData, setSelectedData] = useState({
    representatives: [],
    riders: [],
  });

  // ==================== active inactive zone  ====================
  const [updateZoneStatus, { isLoading: isActiveLoading }] =
    useUpdateZoneStatusMutation();

  const handleToggleStatus = useCallback(
    async (id: any, status: any) => {
      warningAlert({
        text: `Are you sure you want to ${
          status === "ACTIVE" ? "Inactive" : "Active"
        } this zone?`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await updateZoneStatus({
              zoneId: id,
              body: { status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
            }).unwrap();
            if (res?.status === 200) {
              cToastify({
                type: "success",
                message: `Zone ${
                  status === "ACTIVE" ? "Inactive" : "Active"
                } Successfully`,
              });
            }
          } catch (error: any) {
            console.log(error);
            if (error?.status === 400) {
              cToastify({
                type: "error",
                message: `Product ${
                  status === "ACTIVE" ? "Inactive" : "Active"
                } Failed`,
              });
            }
          }
        }
      });
    },
    [updateZoneStatus]
  );

  // ==================== delete product category ====================
  const [deleteZone, { isLoading: isLoadingDelete }] = useDeleteZoneMutation();

  const handleDelete = useCallback(
    async (id: any) => {
      warningAlert({
        text: "Are you sure you want to delete this zone?",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setDeleteId(id);
          try {
            const res = await deleteZone({
              zoneId: id,
            }).unwrap();
            if (res.status === 200) {
              cToastify({
                type: "success",
                message: "Zone Deleted Successfully",
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    [deleteZone]
  );

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    item: any,
    type: "riders" | "representatives"
  ) => {
    setAnchorEl(event.currentTarget);
    if (type === "riders") {
      setSelectedData({ representatives: [], riders: item });
    } else {
      setSelectedData({ representatives: item, riders: [] });
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedData({ representatives: [], riders: [] });
  };

  const isPopoverOpen = Boolean(anchorEl);

  //==================== table data ======================
  const locationNameFormatShow = (item: any, key: string) => {
    return `${item?.[key]?.name} (${item?.[key]?.bn_name})`;
  };

  const tableData = useMemo(() => {
    if (isSuccess) {
      return zoneList?.data?.results?.map((item: any) => {
        return {
          zone_name: item?.zone_name,
          village_name: item?.village_name,
          ward_no: item?.ward_no,
          contact_no: item?.contact_no,
          whatsapp_no: item?.whatsapp_no,
          division: locationNameFormatShow(item, "division"),
          district: locationNameFormatShow(item, "district"),
          upazila: locationNameFormatShow(item, "upazila"),
          union: locationNameFormatShow(item, "union"),
          operator: (
            // <>{`${item?.operator?.fullName} (${item?.operator?.employeeID})`}</>
            <section>
              <span className="font-semibold">{item?.operator?.fullName}</span>{" "}
              &nbsp;
              <small>({item?.operator?.employeeID})</small>
            </section>
          ),
          representatives: (
            <section className="flex items-center justify-center">
              {item?.representatives?.length > 0 ? (
                <CButton
                  variant="contained"
                  circle
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handlePopoverOpen(
                      e,
                      item?.representatives,
                      "representatives"
                    )
                  }
                >
                  <FaEye size={15} />
                </CButton>
              ) : (
                "No representative assigned"
              )}
            </section>
          ),
          riders: (
            <section className="flex items-center justify-center">
              {item?.riders?.length > 0 ? (
                <CButton
                  variant="contained"
                  circle
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handlePopoverOpen(e, item?.riders, "riders")
                  }
                >
                  <FaEye size={15} />
                </CButton>
              ) : (
                "No rider assigned"
              )}
            </section>
          ),
          status: (
            <>
              <section className="flex items-center justify-center">
                <ToggleSwitch
                  isOn={item?.isActive === "ACTIVE" ? true : false}
                  onToggle={() => {
                    handleToggleStatus(item?.id, item?.isActive);
                  }}
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
                  //   dispatch(setSelectSingleProduct(item));
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
  }, [isSuccess, zoneList?.data?.results, deleteId, handleToggleStatus]);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${zoneList?.data?.results?.length}/${zoneList?.data?.count})`
    : "";

  // ==================== navigate to create zone form =================
  const handleNavigateToCreateZoneForm = () => {
    navigate("/vendor/zone/create_zone");
  };
  return (
    <MainCard
      title={`Zone List ${showCountInData}`}
      secondary={
        <>
          <CButton
            variant="solid"
            color="text-primary"
            tooltip
            id="tooltip"
            tooltipContent="Create Product Category"
            tooltipPosition="top-end"
            onClick={handleNavigateToCreateZoneForm}
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
        <Show when={zoneList?.data?.totalPages > 1}>
          <CPagination
            currentPage={zoneList?.data?.currentPage}
            totalPages={zoneList?.data?.totalPages}
            data={zoneList?.data}
            handlePageChange={function (newPage: number): void {
              // console.log(newPage);
              setCurrentPage(newPage);
            }}
          />
        </Show>
      </Show>

      {isPopoverOpen && (
        <div
          className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-xs w-full z-50"
          style={{
            top:
              (anchorEl?.getBoundingClientRect().bottom ?? 0) +
              window.scrollY +
              8,
            left:
              (anchorEl?.getBoundingClientRect().left ?? 0) + window.scrollX,
            transform: "translateX(-50%)",
            width: "max-content",
          }}
        >
          {/* Close button */}
          <CButton
            variant="text"
            className="absolute top-1 right-1 z-50"
            onClick={handlePopoverClose}
          >
            <MdClose className="bg-red-500 text-white rounded-full" />
          </CButton>

          {/* Representatives List */}
          {selectedData?.representatives?.length > 0 && (
            <RepsAndRiders
              selectedDatas={selectedData?.representatives}
              formType="Representatives"
            />
          )}

          {/* Riders List */}
          {selectedData?.riders?.length > 0 && (
            <RepsAndRiders
              selectedDatas={selectedData?.riders}
              formType="Riders"
            />
          )}
        </div>
      )}
    </MainCard>
  );
};

export default Zone;

// make a  dynnamic component to show the list of representatives and riders

const RepsAndRiders = ({
  selectedDatas,
  formType,
}: {
  selectedDatas: any;
  formType: string;
}) => {
  return (
    <>
      <h3 className="text-sm font-semibold mb-2">{formType}</h3>
      <hr className="border-t border-gray-200 mb-2" />
      <ul
        className="space-y-2 max-h-60 overflow-y-auto
      "
      >
        {selectedDatas?.map((data: any) => (
          <li key={data?.id} className="space-x-2 shadow p-1 rounded">
            <span className="font-semibold text-sm">{data?.fullName}</span>
            <small className="text-gray-500">({data?.employeeID})</small>
            <small className="text-gray-500 flex items-center space-x-1 ">
              <FaWhatsapp className="text-green-500" />
              <span>{data?.whatsapp}</span>
            </small>
          </li>
        ))}
      </ul>
    </>
  );
};
