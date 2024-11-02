import React, { FC, useCallback, useEffect, useMemo } from "react";
import { CButton, CInput, CSelect } from "../../../../Utils";
import { useAppSelector } from "../../../../Store/Store";
import { cToastify } from "../../../../Shared";
import {
  useLazyGetIsEmployeeAssignedInZoneQuery,
  useUpdateZoneMutation,
} from "../../../../Store/feature/Zone/zone_api_slice";

import { convertLocationDataForSelect } from "../../../../constant";
import {
  useLazyGetDistrictListQuery,
  useLazyGetDivisionListQuery,
  useLazyGetUnionListQuery,
  useLazyGetUpazilaListQuery,
} from "../../../../Store/feature/Locations/locations_api_slice";
import { useLazyGetEmployeeByRoleQuery } from "../../../../Store/feature/UserManagement/Employee_Slice/Employee_Api_Slice";

const DEFAULT = {
  village_name: "",
  ward_no: "",
  zone_name: "",
  contact_no: "",
  whatsapp_no: "",
  division_id: "",
  district_id: "",
  upazila_id: "",
  union_id: "",
  operatorId: "",
  representatives: [],
  riders: [],
};

type zoneDataType = {
  village_name: string;
  ward_no: any;
  zone_name: string;
  contact_no: string;
  whatsapp_no: string;
  division_id: string | number;
  district_id: string | number;
  upazila_id: string | number;
  union_id: string | number;
  operatorId: string;
  representatives: string[];
  riders: string[];
};

const EditZone: FC<{
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ openEditModal, setOpenEditModal }) => {
  const [data, setData] = React.useState<zoneDataType>(DEFAULT as zoneDataType);
  const { selectedSingleZone } = useAppSelector(
    (state) => state.zoneSlice
  ) as any;
  const [error, setError] = React.useState({
    error_for_zone_name: false,
    error_for_village_name: false,
    error_for_ward_no: false,
    error_for_contact_no: false,
    error_for_division_id: false,
    error_for_district_id: false,
    error_for_upazila_id: false,
    error_for_union_id: false,
    error_for_operatorId: false,

    error_for_representatives: false,
  });

  //   console.log("selectedSingleZone", selectedSingleZone);

  useEffect(() => {
    if (selectedSingleZone?.id) {
      setData({
        zone_name: selectedSingleZone?.zone_name,
        village_name: selectedSingleZone?.village_name,
        ward_no: selectedSingleZone?.ward_no,
        contact_no: selectedSingleZone?.contact_no,
        whatsapp_no: selectedSingleZone?.whatsapp_no,
        division_id: selectedSingleZone?.division?.id,
        district_id: selectedSingleZone?.district?.id,
        upazila_id: selectedSingleZone?.upazila?.id,
        union_id: selectedSingleZone?.union?.id,
        operatorId: selectedSingleZone?.operator?.id,
        representatives: selectedSingleZone?.representatives?.map(
          (item: any) => item?.id
        ),
        riders: selectedSingleZone?.riders?.map((item: any) => item?.id),
      });
    }
  }, [
    selectedSingleZone?.contact_no,
    selectedSingleZone?.district?.id,
    selectedSingleZone?.division?.id,
    selectedSingleZone?.id,
    selectedSingleZone?.operator?.id,
    selectedSingleZone?.representatives,
    selectedSingleZone?.riders,
    selectedSingleZone?.union?.id,
    selectedSingleZone?.upazila?.id,
    selectedSingleZone?.village_name,
    selectedSingleZone?.ward_no,
    selectedSingleZone?.whatsapp_no,
    selectedSingleZone?.zone_name,
  ]);

  //divisionsList====================================================== start
  const [
    getDivisionList,
    {
      data: divisionsList,
      isLoading: isLoadingdivisions,
      isFetching: isFetchingdivisions,
    },
  ] = useLazyGetDivisionListQuery();

  const convertedDivisionList = useMemo(() => {
    if (divisionsList?.status === 200) {
      return convertLocationDataForSelect(divisionsList?.data);
    }
  }, [divisionsList?.data, divisionsList?.status]);

  const handleGetDivisionList = useCallback(async () => {
    // console.log("handleGetDivisionList");
    if (divisionsList?.status === 200) return;
    try {
      await getDivisionList({});
    } catch (error) {
      console.error("Error getting division list:", error);
    }
  }, [divisionsList?.status, getDivisionList]);

  //divisionsList====================================================== end

  //districtsList====================================================== start
  const [
    getDistrictList,
    {
      data: districtsList,
      isLoading: isLoadingDistricts,
      isFetching: isFetchingDistricts,
    },
  ] = useLazyGetDistrictListQuery();

  const convertedDistrictList = useMemo(() => {
    if (districtsList?.status === 200) {
      return convertLocationDataForSelect(districtsList?.data);
    }
  }, [districtsList?.data, districtsList?.status]);

  const handleGetDistrictList = useCallback(async () => {
    if (!data.division_id) return;
    try {
      await getDistrictList(
        {
          division_id: data.division_id,
        },
        { refetchOnMountOrArgChange: true }
      );
    } catch (error) {
      console.error("Error getting district list:", error);
    }
  }, [data?.division_id, getDistrictList]);

  //districtsList====================================================== end

  //upazilasList====================================================== start
  const [
    getUpazilaList,
    {
      data: upazilasList,
      isLoading: isLoadingUpazilas,
      isFetching: isFetchingUpazilas,
    },
  ] = useLazyGetUpazilaListQuery();

  const convertedUpazilasList = useMemo(() => {
    if (upazilasList?.status === 200) {
      return convertLocationDataForSelect(upazilasList?.data);
    }
  }, [upazilasList?.data, upazilasList?.status]);

  const handleGetUpazilaList = useCallback(async () => {
    if (!data.district_id) return;
    try {
      await getUpazilaList(
        {
          district_id: data.district_id,
        },
        { refetchOnMountOrArgChange: true }
      );
    } catch (error) {
      console.error("Error getting upazila list:", error);
    }
  }, [data.district_id, getUpazilaList]);
  //upazilasList====================================================== end

  //unionsList====================================================== start
  const [
    getUnionList,
    {
      data: unionsList,
      isLoading: isLoadingUnions,
      isFetching: isFetchingUnions,
    },
  ] = useLazyGetUnionListQuery();

  const convertedUnionsList = useMemo(() => {
    if (unionsList?.status === 200) {
      return convertLocationDataForSelect(unionsList?.data);
    }
  }, [unionsList?.data, unionsList?.status]);

  const handleGetUnionList = useCallback(async () => {
    if (!data.upazila_id) return;
    try {
      await getUnionList(
        {
          upazila_id: data.upazila_id,
        },
        { refetchOnMountOrArgChange: true }
      );
    } catch (error) {
      console.error("Error getting union list:", error);
    }
  }, [data.upazila_id, getUnionList]);
  //unionsList====================================================== end

  //employessList====================================================== start
  const [operatorsList, setOperatorsList] = React.useState<any[]>([]);
  const [representativesList, setRepresentativesList] = React.useState<any[]>(
    []
  );
  const [ridersList, setRidersList] = React.useState<any[]>([]);

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

  const handleGetEmployeeList = useCallback(
    async (role: "OPERATOR" | "REPRESENTATIVE" | "RAIDER") => {
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
            case "REPRESENTATIVE":
              setRepresentativesList(convertedData);
              break;
            case "RAIDER":
              setRidersList(convertedData);
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
    },
    [convertEmployeesDataForSelect, getEmployeeByRole]
  );

  //employessList====================================================== end

  //useLazyGetIsEmployeeAssignedInZoneQuery start==========================

  const [
    getIsEmployeeAssignedInZone,
    {
      //   data: isEmployeeAssignedInZone,
      // isLoading: isLoadingIsEmployeeAssignedInZone,
      // isFetching: isFetchingIsEmployeeAssignedInZone,
      isError: isErrorIsEmployeeAssignedInZone,
    },
  ] = useLazyGetIsEmployeeAssignedInZoneQuery();

  const handleGetIsEmployeeAssignedInZone = async (
    id: string,
    queryFor: string
  ) => {
    let representativeId = "";
    let operatorId = "";
    if (queryFor === "REPRESENTATIVE") {
      representativeId = id;
    } else if (queryFor === "OPERATOR") {
      operatorId = id;
    }

    if (!representativeId && !operatorId) return;
    try {
      const res = await getIsEmployeeAssignedInZone(
        {
          queryFor,
          ...(representativeId && { representativeId }),
          ...(operatorId && { operatorId }),
        }
        // {
        //   refetchOnMountOrArgChange: true,
        // }
      ).unwrap();
      console.log("isEmployeeAssignedInZone", res);
    } catch (error: any) {
      console.error("Error getting isEmployeeAssignedInZone:", error);
      if (error.status === 409) {
        cToastify({
          type: "error",
          message: error?.data?.message,
        });

        if (queryFor === "REPRESENTATIVE") {
          setError({
            ...error,
            error_for_representatives: true,
          });
        } else if (queryFor === "OPERATOR") {
          setError({
            ...error,
            error_for_operatorId: true,
          });
        }
      }
    }
  };

  //get data from api initialy when component is mounted
  useEffect(() => {
    if (!openEditModal) return;
    handleGetDivisionList();
    handleGetDistrictList();
    handleGetUpazilaList();
    handleGetUnionList();
    handleGetEmployeeList("OPERATOR");
    handleGetEmployeeList("REPRESENTATIVE");
    handleGetEmployeeList("RAIDER");

    return () => {};
  }, [
    openEditModal,
    handleGetDistrictList,
    handleGetDivisionList,
    handleGetUnionList,
    handleGetUpazilaList,
    handleGetEmployeeList,
  ]);

  //   ===================== handleSubmitEdit start==========================

  const [updateZone, { isLoading: isLoadingEditZone }] =
    useUpdateZoneMutation();

  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !data.zone_name ||
      !data.contact_no ||
      !data.division_id ||
      !data.district_id ||
      !data.upazila_id ||
      !data.union_id ||
      !data.operatorId ||
      !data.village_name ||
      !data.ward_no
    ) {
      setError({
        ...error,
        error_for_zone_name: data.zone_name === "" ? true : false,
        error_for_contact_no: data.contact_no === "" ? true : false,
        error_for_division_id: data.division_id === "" ? true : false,
        error_for_district_id: data.district_id === "" ? true : false,
        error_for_upazila_id: data.upazila_id === "" ? true : false,
        error_for_union_id: data.union_id === "" ? true : false,
        error_for_operatorId: data.operatorId === "" ? true : false,
        error_for_village_name: data.village_name === "" ? true : false,
        error_for_ward_no: data.ward_no === "" ? true : false,
      });
      return;
    }

    //get the representatives which are removed
    const initialRepresentatives = selectedSingleZone?.representatives || [];
    const updatedRepresentatives = data.representatives || [];

    // Extract IDs from the initial list if the items are objects
    const initialRepresentativeIds = initialRepresentatives.map(
      (rep: any) => rep?.id
    );

    const removedRepresentatives = initialRepresentativeIds.filter(
      (id: string) => !updatedRepresentatives.includes(id)
    );

    //get the riders which are removed
    const initialRiders = selectedSingleZone?.riders || [];
    const updatedRiders = data.riders || [];

    // Extract IDs from the initial list if the items are objects
    const initialRiderIds = initialRiders.map((rep: any) => rep?.id);

    const removedRiders = initialRiderIds.filter(
      (id: string) => !updatedRiders.includes(id)
    );

    const body = {
      ...data,
      removedRepresentatives,
      removedRiders,
    };

    try {
      await updateZone({
        zoneId: selectedSingleZone?.id,
        body,
      })?.unwrap();
      cToastify({
        type: "success",
        message: "Zone created successfully",
      });
      setOpenEditModal(false);
      setData(DEFAULT as zoneDataType);
    } catch (error: any) {
      console.error("Error creating zone:", error);
      if (error.status === 400) {
        cToastify({
          type: "error",
          message: error?.data?.message,
        });
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmitEdit}>
        <aside className="grid md:grid-cols-2 gap-4  px-1">
          <section>
            <CInput
              type="text"
              name="Zone Name"
              placeholder="Enter your Zone Name"
              label="Zone Name"
              value={data.zone_name}
              tooltip={error.error_for_zone_name}
              tooltipPosition="top-start"
              tooltipContent="Zone Name is required"
              errorQuery={error.error_for_zone_name}
              tooltipVariant="error"
              onChange={(e) => {
                setData({ ...data, zone_name: e.target.value });
                setError({
                  ...error,
                  error_for_zone_name: false,
                });
              }}
            />
          </section>
          <section>
            <CInput
              type="text"
              name="village_name"
              placeholder="Enter your Village Name"
              label="Village Name"
              tooltip={error.error_for_village_name}
              tooltipPosition="top-start"
              tooltipContent="Village Name is required"
              errorQuery={error.error_for_village_name}
              tooltipVariant="error"
              value={data.village_name}
              onChange={(e) => {
                setData({ ...data, village_name: e.target.value });
                setError({
                  ...error,
                  error_for_village_name: false,
                });
              }}
            />
          </section>
          <section>
            <CInput
              type="number"
              name="ward_no"
              placeholder="Enter your Ward No"
              label="Ward No"
              tooltip={error.error_for_ward_no}
              tooltipPosition="top-start"
              tooltipContent="Ward No is required"
              errorQuery={error.error_for_ward_no}
              tooltipVariant="error"
              value={data.ward_no}
              onChange={(e) => {
                setData({ ...data, ward_no: e.target.value });
                setError({
                  ...error,
                  error_for_ward_no: false,
                });
              }}
            />
          </section>
          <section>
            <CInput
              type="number"
              name="contact_no"
              placeholder="Enter your Contact No"
              label="Contact No"
              tooltip={error.error_for_contact_no}
              tooltipPosition="top-start"
              tooltipContent="Contact No is required"
              errorQuery={error.error_for_contact_no}
              tooltipVariant="error"
              value={data.contact_no}
              onChange={(e) => {
                setData({ ...data, contact_no: e.target.value });
                setError({
                  ...error,
                  error_for_contact_no: false,
                });
              }}
            />
          </section>
          <section>
            <CInput
              type="number"
              name="whatsapp_no"
              placeholder="Enter your Whatsapp No"
              label="Whatsapp No"
              value={data.whatsapp_no}
              onChange={(e) =>
                setData({ ...data, whatsapp_no: e.target.value })
              }
            />
          </section>

          <section>
            <CSelect
              id="division_id"
              name="division_id"
              label="Division"
              value={data.division_id}
              tooltip={error.error_for_division_id}
              errorQuery={error.error_for_division_id}
              tooltipPosition="top-start"
              tooltipContent="Division is required"
              tooltipVariant="error"
              loading={isLoadingdivisions || isFetchingdivisions}
              onClick={handleGetDivisionList}
              onChange={(e: any) => {
                setData({
                  ...data,
                  division_id: e ? e.value : "",
                  district_id: "",
                  upazila_id: "",
                  union_id: "",
                });

                setError({
                  ...error,
                  error_for_division_id: false,
                });
              }}
              options={convertedDivisionList || []}
            />
          </section>

          <section>
            <CSelect
              id="district_id"
              name="district_id"
              label="District"
              value={data.district_id}
              disabled={!data.division_id}
              tooltip={error.error_for_district_id}
              errorQuery={error.error_for_district_id}
              tooltipPosition="top-start"
              tooltipContent="District is required"
              tooltipVariant="error"
              loading={isLoadingDistricts || isFetchingDistricts}
              onClick={handleGetDistrictList}
              onChange={(e: any) => {
                setData({
                  ...data,
                  district_id: e ? e.value : "",
                  upazila_id: "",
                  union_id: "",
                });

                setError({
                  ...error,
                  error_for_district_id: false,
                });
              }}
              options={convertedDistrictList || []}
            />
          </section>

          <section>
            <CSelect
              id="upazila_id"
              name="upazila_id"
              label="Upazila"
              value={data.upazila_id}
              disabled={!data.district_id}
              tooltip={error.error_for_upazila_id}
              errorQuery={error.error_for_upazila_id}
              tooltipPosition="top-start"
              tooltipContent="Upazila is required"
              tooltipVariant="error"
              loading={isLoadingUpazilas || isFetchingUpazilas}
              onClick={handleGetUpazilaList}
              onChange={(e: any) => {
                setData({
                  ...data,
                  upazila_id: e ? e.value : "",
                  union_id: "",
                });

                setError({
                  ...error,
                  error_for_upazila_id: false,
                });
              }}
              options={convertedUpazilasList || []}
            />
          </section>

          <section>
            <CSelect
              id="union_id"
              name="union_id"
              label="Union"
              value={data.union_id}
              disabled={!data.upazila_id}
              tooltip={error.error_for_union_id}
              errorQuery={error.error_for_union_id}
              tooltipPosition="top-start"
              tooltipContent="Union is required"
              tooltipVariant="error"
              loading={isLoadingUnions || isFetchingUnions}
              onClick={handleGetUnionList}
              onChange={(e: any) => {
                setData({
                  ...data,
                  union_id: e ? e.value : "",
                });

                setError({
                  ...error,
                  error_for_union_id: false,
                });
              }}
              options={convertedUnionsList || []}
            />
          </section>

          <section>
            <CSelect
              id="operatorId"
              name="operatorId"
              label="Operator"
              //   value={data.operatorId}
              defaultValue={
                data.operatorId
                  ? operatorsList?.find(
                      (item) => item.value === data.operatorId
                    )
                  : ""
              }
              errorQuery={error.error_for_operatorId}
              tooltip={error.error_for_operatorId}
              tooltipPosition="top-start"
              tooltipContent="Operator is required"
              tooltipVariant="error"
              loading={isLoadingEmployees || isFetchingEmployees}
              onClick={() => handleGetEmployeeList("OPERATOR")}
              onChange={(e: any) => {
                setError({
                  ...error,
                  error_for_operatorId: false,
                });
                setData({
                  ...data,
                  operatorId: e ? e.value : "",
                });

                if (selectedSingleZone?.operator?.id === e?.value) {
                  return;
                }

                //if add new then call the api
                if (data.operatorId !== e?.value) {
                  handleGetIsEmployeeAssignedInZone(e?.value, "OPERATOR");
                }
              }}
              options={operatorsList || []}
            />
          </section>
          <section>
            <CSelect
              id="representatives"
              name="representatives"
              label="Representatives"
              defaultValue={
                data.representatives?.length > 0
                  ? representativesList?.filter((item) =>
                      data.representatives.includes(item.value)
                    )
                  : []
              }
              errorQuery={error.error_for_representatives}
              tooltip={error.error_for_representatives}
              tooltipPosition="top-start"
              tooltipContent="Representatives is required"
              tooltipVariant="error"
              loading={isLoadingEmployees || isFetchingEmployees}
              onClick={() => handleGetEmployeeList("REPRESENTATIVE")}
              isClearable={false}
              isMulti
              onChange={(e: any) => {
                setError({
                  ...error,
                  error_for_representatives: false,
                });
                setData({
                  ...data,
                  representatives: e ? e?.map((item: any) => item.value) : [],
                });

                //if select data is in present representatives then not call the api
                const isMatch = selectedSingleZone?.representatives?.some(
                  (representative: any) =>
                    e?.some((item: any) => item.value === representative.id)
                );
                if (isMatch) {
                  return;
                }

                //if add new then call the api
                if (data.representatives?.length < e?.length) {
                  const newRepresentatives = e?.map((item: any) => item.value);
                  handleGetIsEmployeeAssignedInZone(
                    newRepresentatives[newRepresentatives.length - 1],
                    "REPRESENTATIVE"
                  );
                }
              }}
              options={representativesList || []}
            />
          </section>

          <section>
            <CSelect
              id="riders"
              name="riders"
              label="Riders"
              defaultValue={
                data.riders?.length > 0
                  ? ridersList?.filter((item) =>
                      data.riders.includes(item.value)
                    )
                  : []
              }
              // errorQuery={error.error_for_riders}
              // tooltip={error.error_for_riders}
              tooltipPosition="top-start"
              tooltipContent="Riders is required"
              tooltipVariant="error"
              loading={isLoadingEmployees || isFetchingEmployees}
              onClick={() => handleGetEmployeeList("RAIDER")}
              isMulti
              onChange={(e: any) => {
                setData({
                  ...data,
                  riders: e ? e.map((item: any) => item?.value) : [],
                });
              }}
              options={ridersList || []}
            />
          </section>
        </aside>

        {/* //button  */}

        <section className="flex justify-end items-center mt-5">
          <CButton
            variant="outline"
            type="submit"
            disabled={isErrorIsEmployeeAssignedInZone || isLoadingEditZone}
            loading={isLoadingEditZone}
          >
            Update Product
          </CButton>
        </section>
      </form>
    </main>
  );
};

export default React.memo(EditZone);
