import React, { useCallback, useMemo, useState } from "react";
import MainCard from "../../../Utils/CCard/MainCard";
import {
  CButton,
  CModal,
  CPagination,
  CSelect,
  CSkeleton,
} from "../../../Utils";
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
import { warningAlert } from "../../../Utils/alert-function";
import { cToastify } from "../../../Shared";
import { setSelectedSingleZone } from "../../../Store/feature/Zone/zoneSlice";
import RepsAndRiders from "./RepsAndRiders/RepsAndRiders";
import EditZone from "./EditZone/EditZone";
import { useLazyGetEmployeeByRoleQuery } from "../../../Store/feature/UserManagement/Employee_Slice/Employee_Api_Slice";

const Zone = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<any>();
  const [status, setStatus] = useState<string>("ACTIVE");
  const [operatorId, setOperatorId] = useState<string>("");

  const {
    data: zoneList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetZoneListQuery(
    {
      status: status,
      pagination: true,
      pageNumber: currentPage,
      ...(operatorId && { operatorId }),
    },
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
  const [updateZoneStatus] = useUpdateZoneStatusMutation();

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
                  dispatch(setSelectedSingleZone(item));
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
    zoneList?.data?.results,
    deleteId,
    isLoadingDelete,
    handleToggleStatus,
    dispatch,
    handleDelete,
  ]);

  // ==================== show count in data =================
  const showCountInData = isSuccess
    ? `(${zoneList?.data?.results?.length}/${zoneList?.data?.count})`
    : "";

  //employessList====================================================== start
  const [operatorsList, setOperatorsList] = React.useState<any[]>([]);

  const [
    getEmployeeByRole,
    { isLoading: isLoadingEmployees, isFetching: isFetchingEmployees },
  ] = useLazyGetEmployeeByRoleQuery();

  const convertEmployeesDataForSelect = useCallback((data: any) => {
    return data?.map((item: any) => {
      const name = `${item.fullName} ${item.user?.username}`;
      return {
        ...item,
        label: `${name} (${item.employeeID})`,
        value: item.id,
      };
    });
  }, []);

  const handleGetEmployeeList = async (role: "OPERATOR") => {
    try {
      const res = await getEmployeeByRole(role, {
        refetchOnMountOrArgChange: true,
      }).unwrap();
      if (res?.status === 200) {
        const convertedData = convertEmployeesDataForSelect(res?.data);
        switch (role) {
          case "OPERATOR":
            setOperatorsList(convertedData);
            break;
          default:
            break;
        }
      }
    } catch (error: any) {
      console.error("Error getting employee list:", error);
      if (error.status === 400) {
        cToastify({
          type: "error",
          message: error?.data?.message,
        });
      }
    }
  };

  //employessList====================================================== end

  // ==================== filter section ====================
  const filterSection = () => {
    return (
      <section className="flex items-center space-x-2">
        <CSelect
          id="operatorId"
          name="operatorId"
          width="md:w-[200px] w-[100px]"
          classNamePrefix="Select Operator"
          value={operatorId}
          loading={isLoadingEmployees || isFetchingEmployees}
          onClick={() => handleGetEmployeeList("OPERATOR")}
          onChange={(e: any) => {
            setOperatorId(e?.value);
          }}
          options={operatorsList || []}
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

  // ==================== navigate to create zone form =================
  const handleNavigateToCreateZoneForm = () => {
    navigate("/vendor/zone/create_zone");
  };
  return (
    <MainCard
      title={`Zone List ${showCountInData}`}
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

      {/* //edit modal section */}
      <CModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        title="Edit Zone"
        width="max-w-2xl"
        height="container"
      >
        <EditZone
          setOpenEditModal={setOpenEditModal}
          openEditModal={openEditModal}
        />
      </CModal>

      {/* Popover */}

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
