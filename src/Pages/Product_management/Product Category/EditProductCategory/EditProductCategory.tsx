import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../Store/Store";
import { CButton, CInput } from "../../../../Utils";
import CTextArea from "../../../../Utils/CTextArea/CTextArea";
import CFileInput from "../../../../Utils/CFileInput/CFileInput";
import { categoryDataType } from "../productCategory_type";
import { MdCancel } from "react-icons/md";
import { useProductCategoryUpdateMutation } from "../../../../Store/feature/Product_management/ProductCategory/ProductCategory_api_slice";
import { errorAlert, successAlert } from "../../../../Utils/alert-function";
import { Show } from "easy-beauty-components---react";
import { cToastify } from "../../../../Shared";

const EditProductCategory = ({ onClose }: { onClose: any }) => {
  const { selectSingleProductCategory } = useAppSelector(
    (state) => state.productCategorySlice
  ) as any;
  const [editData, setEditData] = useState<categoryDataType>({
    product_category_name: "",
    description: "",
    product_image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setEditData({ ...editData, [name]: value });
    if (files) {
      setEditData({ ...editData, product_image: files[0] });
    }
  };

  //handleUpdate

  const [productCategoryUpdate, { isLoading, isSuccess, isError, error }] =
    useProductCategoryUpdateMutation();

  useEffect(() => {
    if (isSuccess) {
      cToastify({
        type: "success",
        message: "Product Category Updated Successfully",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      errorAlert({
        text: error?.data?.message || "Something went wrong",
      });
    }
  }, [isError, error?.data?.message]);

  const handleUpdate = async () => {
    // console.log(editData);
    const body = {
      product_category_name: editData.product_category_name,
      description: editData.description,
    } as any;

    const multipartData = new FormData();

    if (editData.product_image instanceof File) {
      multipartData.append("image", editData.product_image);
    }

    for (const key in body) {
      if (body[key]) {
        multipartData.append(key, body[key]);
      }
    }
    try {
      const categoryId = selectSingleProductCategory?.id;
      await productCategoryUpdate({
        categoryId,
        body: multipartData,
      });
      onClose();
    } catch (err) {
      console.log(err);
      onClose();
    }

    setEditData({
      product_category_name: "",
      description: "",
      product_image: null,
    });
  };
  return (
    <>
      <main className="space-y-4">
        <section>
          <CInput
            type="text"
            id="product_category"
            name="product_category_name"
            placeholder="Enter your Product Category"
            label="Product Category"
            tooltipContent="Product category is required"
            key={selectSingleProductCategory?.id}
            defaultValue={
              selectSingleProductCategory.product_category_name as string
            }
            tooltipVariant="error"
            onChange={handleChange}
          />
        </section>
        <section>
          <CTextArea
            id="description"
            name="description"
            placeholder="Enter your Product Description"
            label="Description"
            onChange={handleChange}
            key={selectSingleProductCategory?.id}
            defaultValue={selectSingleProductCategory?.description}
          />
        </section>

        {/* Product Image Upload */}
        <>
          <section className="relative">
            <Show
              when={
                editData?.product_image ||
                selectSingleProductCategory.image?.url
              }
            >
              <img
                src={
                  editData?.product_image
                    ? URL.createObjectURL(editData?.product_image)
                    : selectSingleProductCategory.image?.url
                }
                alt={"Product category Image"}
                loading="lazy"
                className="border-2 border-gray-200 rounded-md object-contain h-40 w-full"
              />
            </Show>

            {/* //cancel button */}
            {editData?.product_image && (
              <CButton
                variant="text"
                type="button"
                circle
                paddingNone
                onClick={() =>
                  setEditData({ ...editData, product_image: null })
                }
                className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
              >
                <MdCancel size={20} />
              </CButton>
            )}
          </section>

          <CFileInput
            type="file"
            id="product_image"
            name="product_image"
            placeholder="Upload New Image"
            label="Product Image"
            files={editData?.product_image}
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleChange}
          />
        </>

        <CButton
          variant="outline"
          type="submit"
          onClick={handleUpdate}
          fullWidth
          loading={isLoading}
        >
          Update
        </CButton>
      </main>
    </>
  );
};

export default EditProductCategory;
