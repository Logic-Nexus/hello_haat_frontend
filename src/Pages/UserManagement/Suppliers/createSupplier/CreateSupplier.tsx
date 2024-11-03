import React, { useState } from "react";
import MainCard from "../../../../Utils/CCard/MainCard";
import { CButton, CInput } from "../../../../Utils";
import CFileInput from "../../../../Utils/CFileInput/CFileInput";
import { useCreateSupplierMutation } from "../../../../Store/feature/UserManagement/Supplier/supplier_api_slice";

type supplierDataType = {
  supplierName: string;
  srName: string;
  srContactNo: string;
  srWhatsappNo: string;
  dealerName: string;
  dealerContactNo: string;
  dealerEmail: string;
  dealerAddress: string;
  companyLogo: File | null;
  srPhoto: File | null;
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

const CreateSupplier = () => {
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

  const [createSupplier, { isLoading }] = useCreateSupplierMutation();
  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    const formData = new FormData();

    for (const key in createData) {
      if (createData[key as keyof supplierDataType]) {
        formData.append(key, createData[key as keyof supplierDataType] as any);
      }
    }

    if (createData.companyLogo instanceof File) {
      formData.append("companyLogo", createData.companyLogo);
    }

    if (createData.srPhoto instanceof File) {
      formData.append("srPhoto", createData.srPhoto);
    }

    try {
      await createSupplier(formData).unwrap();
      setCreateData(DEFAULT_SUPPLIER_DATA);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <MainCard title="Create Employee">
      <form
        onSubmit={handleCreateSubmit}
        // autoComplete={"off"}
        // autoCorrect="off"
      >
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
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
              errorQuery={error?.error_for_username}
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
            <CFileInput
              type="file"
              id="companyLogo"
              files={createData.companyLogo}
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
          <div className="p-1">
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
          </div>
        </div>

        <div className="my-4 p-1 flex justify-end">
          <CButton loading={isLoading} variant="outline" type="submit">
            Create
          </CButton>
        </div>
      </form>
    </MainCard>
  );
};

export default CreateSupplier;
