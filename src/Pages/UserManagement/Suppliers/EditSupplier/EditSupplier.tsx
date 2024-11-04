import React, { useEffect, useState } from "react";
import { useEditSupplierMutation } from "../../../../Store/feature/UserManagement/Supplier/supplier_api_slice";
import { cToastify } from "../../../../Shared";
import { CButton, CInput } from "../../../../Utils";
import CFileInput from "../../../../Utils/CFileInput/CFileInput";
import { useAppDispatch, useAppSelector } from "../../../../Store/Store";
import { setSelectedSingleSupplier } from "../../../../Store/feature/UserManagement/Supplier/supplierSlice";

type supplierDataType = {
  supplierName: string;
  srName: string;
  srContactNo: string;
  srWhatsappNo: string;
  dealerName: string;
  dealerContactNo: string;
  dealerEmail: string;
  dealerAddress: string;
  companyLogo?: File | null;
  srPhoto?: File | null;
};

const DEFAULT_SUPPLIER_DATA: supplierDataType = {
  supplierName: "",
  srName: "",
  srContactNo: "",
  srWhatsappNo: "",
  dealerName: "",
  dealerContactNo: "",
  dealerEmail: "",
  dealerAddress: "",
  companyLogo: null,
  srPhoto: null,
};
const EditSupplier = ({
  setOpenEditModal,
}: {
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const { selectedSingleSupplier } = useAppSelector(
    (state) => state.supplierSlice
  ) as any;
  const [createData, setCreateData] = useState<supplierDataType>(
    DEFAULT_SUPPLIER_DATA
  );

  const [error, setError] = useState<any>({
    error_for_supplier_name: false,
    error_for_sr_name: false,
    error_for_sr_contact_no: false,
    error_for_sr_whatsapp_no: false,
    error_for_dealer_name: false,
    error_for_dealer_contact_no: false,
    error_for_dealer_email: false,
    error_for_dealer_address: false,
  });

  const [editSupplier, { isLoading }] = useEditSupplierMutation();

  useEffect(() => {
    if (selectedSingleSupplier?.id) {
      setCreateData({
        supplierName: selectedSingleSupplier?.supplierName,
        srName: selectedSingleSupplier?.srName,
        srContactNo: selectedSingleSupplier?.srContactNo,
        srWhatsappNo: selectedSingleSupplier?.srWhatsappNo,
        dealerName: selectedSingleSupplier?.dealerName,
        dealerContactNo: selectedSingleSupplier?.dealerContactNo,
        dealerEmail: selectedSingleSupplier?.dealerEmail,
        dealerAddress: selectedSingleSupplier?.dealerAddress,
        companyLogo: selectedSingleSupplier?.companyLogo?.url,
        srPhoto: selectedSingleSupplier?.srPhoto?.url,
      });
    }
  }, [
    selectedSingleSupplier?.dealerAddress,
    selectedSingleSupplier?.dealerContactNo,
    selectedSingleSupplier?.dealerEmail,
    selectedSingleSupplier?.dealerName,
    selectedSingleSupplier?.id,
    selectedSingleSupplier?.srContactNo,
    selectedSingleSupplier?.srName,
    selectedSingleSupplier?.srWhatsappNo,
    selectedSingleSupplier?.supplierName,
    selectedSingleSupplier?.companyLogo?.url,
    selectedSingleSupplier?.srPhoto?.url,
  ]);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !createData.supplierName ||
      !createData?.srName ||
      !createData?.srContactNo ||
      !createData?.srWhatsappNo ||
      !createData?.dealerName ||
      !createData?.dealerContactNo ||
      !createData?.dealerEmail ||
      !createData?.dealerAddress
    ) {
      setError({
        error_for_supplier_name: !createData.supplierName,
        error_for_sr_name: !createData?.srName,
        error_for_sr_contact_no: !createData?.srContactNo,
        error_for_sr_whatsapp_no: !createData?.srWhatsappNo,
        error_for_dealer_name: !createData?.dealerName,
        error_for_dealer_contact_no: !createData?.dealerContactNo,
        error_for_dealer_email: !createData?.dealerEmail,
        error_for_dealer_address: !createData?.dealerAddress,
      });
      return;
    }

    //first check  createData and the selectedSingleSupplier data is same or not
    //if same then no need to update
    //if not same then update the data

    if (
      createData.supplierName === selectedSingleSupplier.supplierName &&
      createData.srName === selectedSingleSupplier.srName &&
      createData.srContactNo === selectedSingleSupplier.srContactNo &&
      createData.srWhatsappNo === selectedSingleSupplier.srWhatsappNo &&
      createData.dealerName === selectedSingleSupplier.dealerName &&
      createData.dealerContactNo === selectedSingleSupplier.dealerContactNo &&
      createData.dealerEmail === selectedSingleSupplier.dealerEmail &&
      createData.dealerAddress === selectedSingleSupplier.dealerAddress &&
      createData.companyLogo === selectedSingleSupplier.companyLogo?.url &&
      createData.srPhoto === selectedSingleSupplier.srPhoto?.url
    ) {
      cToastify({
        type: "error",
        message: "No changes found to update",
      });
      return;
    }

    const formData = new FormData();

    for (const key in createData) {
      //only change the data which is different
      if (
        createData[key as keyof supplierDataType] !==
        selectedSingleSupplier[key as keyof supplierDataType]
      ) {
        formData.append(key, createData[key as keyof supplierDataType] as any);
        //remove logo and photo from the data
        if (key === "companyLogo" || key === "srPhoto") {
          formData.delete(key);
        }
      }
    }

    if (createData.companyLogo instanceof File) {
      formData.append("companyLogo", createData.companyLogo);
    }

    if (createData.srPhoto instanceof File) {
      formData.append("srPhoto", createData.srPhoto);
    }

    try {
      const res = await editSupplier({
        supplierId: selectedSingleSupplier?.id,
        body: formData,
      }).unwrap();

      if (res.status === 200) {
        cToastify({
          type: "success",
          message: "Supplier Updated Successfully",
        });
        setOpenEditModal(false);
      }
      dispatch(setSelectedSingleSupplier(null));
      setCreateData(DEFAULT_SUPPLIER_DATA);
    } catch (err: any) {
      console.log("Error", err);
      if (err.data?.status === 400) {
        cToastify({
          type: "error",
          message: err.data.message,
        });
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleEditSubmit}
        // autoComplete={"off"}
        // autoCorrect="off"
      >
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section>
            <CInput
              id="supplierName"
              value={createData.supplierName}
              label="Supplier Name"
              name="supplierName"
              tooltip={error?.error_for_supplier_name}
              tooltipPosition="right"
              tooltipContent="Supplier name is required"
              errorQuery={error?.error_for_supplier_name}
              tooltipVariant="error"
              onChange={(e) =>
                setCreateData({ ...createData, supplierName: e.target.value })
              }
            />
          </section>
          <section>
            <CInput
              id="srName"
              value={createData.srName}
              label="SR Name"
              name="srName"
              tooltip={error?.error_for_sr_name}
              tooltipPosition="right"
              tooltipContent="SR name is required"
              errorQuery={error?.error_for_sr_name}
              tooltipVariant="error"
              onChange={(e) => {
                setCreateData({ ...createData, srName: e.target.value });
              }}
            />
          </section>
          <section>
            <CInput
              id="srContactNo"
              value={createData.srContactNo}
              label="SR Contact No"
              name="srContactNo"
              tooltip={error?.error_for_sr_contact_no}
              tooltipPosition="right"
              tooltipContent="SR contact no is required"
              errorQuery={error?.error_for_sr_contact_no}
              tooltipVariant="error"
              onChange={(e) => {
                setCreateData({ ...createData, srContactNo: e.target.value });
              }}
            />
          </section>
          <section>
            <CInput
              id="srWhatsappNo"
              value={createData.srWhatsappNo}
              label="SR Whatsapp No"
              name="srWhatsappNo"
              tooltip={error?.error_for_sr_whatsapp_no}
              tooltipPosition="right"
              tooltipContent="SR whatsapp no is required"
              errorQuery={error?.error_for_sr_whatsapp_no}
              tooltipVariant="error"
              onChange={(e) => {
                setCreateData({ ...createData, srWhatsappNo: e.target.value });
              }}
            />
          </section>
          <section>
            <CInput
              id="dealerName"
              value={createData.dealerName}
              label="Dealer Name"
              name="dealerName"
              tooltip={error?.error_for_dealer_name}
              tooltipPosition="right"
              tooltipContent="Dealer name is required"
              errorQuery={error?.error_for_dealer_name}
              tooltipVariant="error"
              onChange={(e) =>
                setCreateData({ ...createData, dealerName: e.target.value })
              }
            />
          </section>

          <section>
            <CInput
              id="dealerContactNo"
              value={createData.dealerContactNo}
              label="Dealer Contact No"
              name="dealerContactNo"
              tooltip={error?.error_for_dealer_contact_no}
              tooltipPosition="right"
              tooltipContent="Dealer contact no is required"
              errorQuery={error?.error_for_dealer_contact_no}
              tooltipVariant="error"
              onChange={(e) => {
                setCreateData({
                  ...createData,
                  dealerContactNo: e.target.value,
                });
              }}
            />
          </section>
          <section>
            <CInput
              id="dealerEmail"
              type="email"
              value={createData.dealerEmail}
              label="Dealer Email"
              name="dealerEmail"
              tooltip={error?.error_for_dealer_email}
              tooltipPosition="right"
              tooltipContent="Dealer email is required"
              errorQuery={error?.error_for_dealer_email}
              tooltipVariant="error"
              onChange={(e) =>
                setCreateData({ ...createData, dealerEmail: e.target.value })
              }
            />
          </section>
          <section>
            <CInput
              id="dealerAddress"
              value={createData.dealerAddress}
              label="Dealer Address"
              name="dealerAddress"
              tooltip={error?.error_for_dealer_address}
              tooltipPosition="right"
              tooltipContent="Dealer address is required"
              errorQuery={error?.error_for_dealer_address}
              tooltipVariant="error"
              onChange={(e) =>
                setCreateData({ ...createData, dealerAddress: e.target.value })
              }
            />
          </section>

          <section>
            {createData.companyLogo && (
              <PreviewImage
                image={createData.companyLogo}
                name="Company Logo"
                handleSetData={() =>
                  setCreateData({
                    ...createData,
                    companyLogo: selectedSingleSupplier?.companyLogo?.url,
                  })
                }
              />
            )}

            <CFileInput
              type="file"
              id="companyLogo"
              files={createData?.companyLogo}
              placeholder="Upload Company Logo"
              label="Company Logo"
              name="companyLogo"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                setCreateData({
                  ...createData,
                  companyLogo: e.target.files ? e.target.files[0] : null,
                });
              }}
            />
          </section>
          <section>
            {createData.srPhoto && (
              <PreviewImage
                image={createData.srPhoto}
                name="SR Photo"
                handleSetData={() =>
                  setCreateData({
                    ...createData,
                    srPhoto: selectedSingleSupplier?.srPhoto?.url,
                  })
                }
              />
            )}
            <CFileInput
              type="file"
              id="srPhoto"
              files={createData.srPhoto}
              placeholder="Upload SR Photo"
              label="SR Photo"
              name="srPhoto"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                setCreateData({
                  ...createData,
                  srPhoto: e.target.files ? e.target.files[0] : null,
                });
              }}
            />
          </section>
        </div>

        <div className="my-4 p-1 flex justify-end">
          <CButton loading={isLoading} variant="outline" type="submit">
            Update
          </CButton>
        </div>
      </form>
    </>
  );
};

export default EditSupplier;

const PreviewImage = ({
  image,
  name,
  handleSetData,
}: {
  image: File | string;
  name: string;
  handleSetData: () => void;
}) => {
  return (
    <div className="w-36 h-36 mx-auto border rounded-lg shadow relative">
      {typeof image === "string" && (
        <img src={image} alt={name} className="w-full h-full object-contain" />
      )}
      {image instanceof File && (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt={name}
            className="w-full h-full object-contain"
          />
          <button
            onClick={handleSetData}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full w-8 h-8 focus:outline-none"
          >
            X
          </button>
        </>
      )}
    </div>
  );
};
