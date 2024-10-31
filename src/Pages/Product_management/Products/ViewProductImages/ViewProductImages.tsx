import React, { useState } from "react";
import { useAppSelector } from "../../../../Store/Store";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";

import {
  useDeleteProductImageMutation,
  useGetProductImagesByProductIdQuery,
  useToggleImageActiveMutation,
  useUploadProductImageMutation,
} from "../../../../Store/feature/Product_management/Product/products_api_slice";
import { CButton, CModal } from "../../../../Utils";
import CFileInput from "../../../../Utils/CFileInput/CFileInput";
import MainCard from "../../../../Utils/CCard/MainCard";
import MainTable from "../../../../Utils/MainTable/MainTable";
import ToggleSwitch from "../../../../Utils/ToggleSwitch/ToggleSwitch";

import { FaTrashCan } from "react-icons/fa6";
import { warningAlert } from "../../../../Utils/alert-function";
import { cToastify } from "../../../../Shared";
import { Show } from "easy-beauty-components---react";

const ViewProductImages = () => {
  const { selectSingleProduct } = useAppSelector(
    (state) => state.productSlice
  ) as any;

  const {
    data: productImages,
    isLoading,
    error,
  } = useGetProductImagesByProductIdQuery(selectSingleProduct?.id, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
    skip: !selectSingleProduct?.id,
  });

  const [deleteProductImage, { isLoading: deleteLoading }] =
    useDeleteProductImageMutation();
  const [toggleImageActive] = useToggleImageActiveMutation();
  const [uploadProductImage, { isLoading: uploadLoading }] =
    useUploadProductImageMutation();

  const [selectImageId, setSelectImageId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);

  // Handle image deletion
  const handleDeleteImage = async (id: string) => {
    setSelectImageId(id);
    warningAlert({
      title: "Are you sure?",
      text: "Are you sure you want to delete this image?",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProductImage({
            imageId: id,
          });
          setSelectImageId(null);
          cToastify({
            type: "success",
            message: "Image deleted successfully",
          });
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }
    });
  };

  // Handle image activation/deactivation
  const handleToggleActive = async (id: string, isActive: string) => {
    warningAlert({
      title: "Are you sure?",
      text: `Are you sure you want to ${
        isActive === "ACTIVE" ? "Inactivate" : "activate"
      } this image?`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await toggleImageActive({
            imageId: id,
            isActive: isActive === "ACTIVE" ? "INACTIVE" : "ACTIVE",
          });

          cToastify({
            type: "success",
            message: `${
              isActive === "ACTIVE" ? "Image Inactivated" : "Image Activated"
            } successfully`,
          });
        } catch (error) {
          console.error("Error toggling image activation:", error);
        }
      }
    });
  };

  // Handle image upload

  const [files, setFiles] = useState<FileList | null>(null);

  const handleUploadImage = async () => {
    if (files) {
      const formData = new FormData();

      // Append each file to FormData with the same key
      for (let i = 0; i < files.length; i++) {
        formData.append("product_images", files[i]);
      }
      try {
        const res = await uploadProductImage({
          productId: selectSingleProduct?.id,
          body: formData,
        })?.unwrap();
        console.log("res", res);

        setFiles(null);
        setUploadModalOpen(false);
        cToastify({
          type: "success",
          message: "Images uploaded successfully",
        });
      } catch (error: any) {
        if (error.status === 400) {
          cToastify({
            type: "error",
            message: error.data.message || "Error uploading image",
          });
        }
        console.error("Error uploading image:", error);
      }
    }
  };

  const tableData = productImages?.data?.map((image: any) => ({
    SKU: selectSingleProduct?.product_code,
    image_url: (
      <section className="flex items-center justify-center relative">
        <img
          src={image?.image?.url}
          alt="Product Image"
          className="lg:w-20 lg:h-20 w-10 h-10 object-contain rounded shadow-md cursor-pointer"
          onClick={() => setSelectedImage(image.image?.url)}
        />
        {/* //full screen icon  */}
        <div className="absolute top-0 right-0 p-2 md:block hidden">
          <MdFullscreen
            className="text-2xl cursor-pointer"
            onClick={() => setSelectedImage(image.image?.url)}
          />
        </div>
      </section>
    ),
    is_active: (
      <>
        <section className="flex items-center justify-center">
          <ToggleSwitch
            isOn={image?.isActive === "ACTIVE" ? true : false}
            onToggle={() => handleToggleActive(image.id, image?.isActive)}
          />
        </section>
      </>
    ),
    action: (
      <section className="flex items-center justify-center space-x-2">
        <CButton
          variant="contained"
          circle
          color="bg-red-500 text-white dark:bg-red-600 dark:text-white hover:bg-red-700 dark:hover:bg-red-800"
          tooltip
          id="tooltip-delete"
          tooltipContent="Delete Product Category"
          tooltipPosition="right"
          className="w-8 h-8"
          onClick={() => handleDeleteImage(image?.id)}
          loading={deleteLoading && selectImageId === image?.id ? true : false}
        >
          <section className="text-md">
            <FaTrashCan />
          </section>
        </CButton>
      </section>
    ),
  }));

  return (
    <MainCard
      title={
        isLoading ? "Loading images..." : `Total Images: ${tableData?.length}`
      }
      secondary={
        <section className="flex justify-end">
          <CButton variant="contained" onClick={() => setUploadModalOpen(true)}>
            <FaCloudUploadAlt />
            <span className="md:block hidden">Upload Image</span>
          </CButton>
        </section>
      }
    >
      {/* Image Gallery */}
      <section className="mt-4 max-h-[calc(100vh-280px)] overflow-auto">
        <MainTable data={tableData || []} filter dense />
      </section>

      {/* Fullscreen Image Modal */}

      <Show when={selectedImage ? true : false}>
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative">
            <img
              src={selectedImage || undefined}
              alt="Selected Product"
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-red-800 rounded-full w-8 h-8 focus:outline-none "
            >
              ✕
            </button>
          </div>
        </section>
      </Show>

      {/* Upload Modal */}

      <CModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Select New Images for Product"
      >
        <CFileInput
          onChange={(e) => {
            setFiles(e.target.files);
          }}
          multiple
          files={files}
          accept="image/*"
          label="Upload Images"
        />

        <section className="flex justify-end mt-4">
          <CButton
            variant="contained"
            color="bg-green-500 text-white hover:bg-green-700"
            onClick={() => handleUploadImage()}
            loading={uploadLoading}
            disabled={!files}
          >
            Upload
          </CButton>
        </section>
      </CModal>
    </MainCard>
  );
};

export default ViewProductImages;
