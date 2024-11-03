import React, { useMemo, useState } from "react";
import MainCard from "../../../../Utils/CCard/MainCard";
import { CButton, CInput, CSelect } from "../../../../Utils";
import {
  DELIVERY_TYPE,
  PRODUCT_QUANTITY,
} from "../product_constant/product_constant";
import CFileInput from "../../../../Utils/CFileInput/CFileInput";
import { useCreateProductMutation } from "../../../../Store/feature/Product_management/Product/products_api_slice";
import { cToastify } from "../../../../Shared";
import { useNavigate } from "react-router-dom";
import { useLazyProductCategoryNameListDataQuery } from "../../../../Store/feature/Product_management/ProductCategory/ProductCategory_api_slice";
import { convertDataForSelect } from "../../../../constant";
import CTextArea from "../../../../Utils/CTextArea/CTextArea";

type productDataType = {
  product_name: string;
  description: string;
  product_quantity: string;
  delivery_charge: string;
  product_category_id: string;
  product_images: string | File | null;
};

const AddNewProducts = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<productDataType>({
    product_name: "",
    description: "",
    product_quantity: "",
    delivery_charge: "",
    product_category_id: "",
    product_images: null,
  });

  const [error, setError] = useState({
    error_for_product_name: false,
    error_for_description: false,
    error_for_product_quantity: false,
    error_for_delivery_charge: false,
    error_for_product_category_id: false,
    error_for_product_images: false,
  });

  //create product

  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !data.product_name ||
      !data.product_category_id ||
      !data.product_quantity ||
      !data.delivery_charge
    ) {
      setError({
        ...error,
        error_for_product_name: true,
        error_for_product_category_id: true,
        error_for_product_quantity: true,
        error_for_delivery_charge: true,
      });
      return;
    } else {
      setError({
        ...error,
        error_for_product_name: false,
        error_for_product_category_id: false,
        error_for_product_quantity: false,
        error_for_delivery_charge: false,
      });
    }

    const formData = new FormData();
    const files =
      data.product_images instanceof FileList ? data.product_images : [];

    // Check if all required fields are filled
    for (const key in data) {
      const typedKey = key as keyof productDataType;
      if (data[typedKey]) {
        formData.append(typedKey, data[typedKey] as string | Blob);
      }
    }

    // Append each file to FormData with the same key
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("product_images", files[i]);
      }
    }

    try {
      await createProduct({
        body: formData,
      })?.unwrap();
      // console.log("res", res);
      cToastify({
        type: "success",
        message: "Product created successfully",
      });

      //back to product list
      navigate(-1);

      setData({
        product_name: "",
        description: "",
        product_quantity: "",
        delivery_charge: "",
        product_category_id: "",
        product_images: null,
      });
    } catch (error: any) {
      if (error.status === 400) {
        cToastify({
          type: "error",
          message: error.data.message || "Error uploading image",
        });
      }
    }
  };

  //handleGetProductCategoryNameList
  const [
    productCategoryNameListData,
    {
      data: getProductCategoryData,
      isLoading: isLoadingGetProductCategory,
      isFetching: isFetchingGetProductCategory,
    },
  ] = useLazyProductCategoryNameListDataQuery();

  const productCategoryNameList = useMemo(() => {
    if (getProductCategoryData?.status === 200) {
      return convertDataForSelect(
        getProductCategoryData?.data,
        "product_category_name"
      );
    }
  }, [getProductCategoryData?.data, getProductCategoryData?.status]);

  const handleGetProductCategoryNameList = async () => {
    try {
      await productCategoryNameListData({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting product category name list:", error);
    }
  };

  return (
    <main className="lg:h-auto h-[calc(100vh-9.9rem)]">
      <MainCard title={`Create Product`}>
        <form onSubmit={handleSubmit}>
          <aside className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <section className="md:col-span-1 col-span-2">
              <CInput
                type="text"
                id="product_name"
                name="product_name"
                placeholder="Enter your Product Name"
                label="Product Name"
                tooltip={error.error_for_product_name}
                tooltipPosition="top-start"
                tooltipContent="Product category is required"
                errorQuery={error.error_for_product_name}
                value={data.product_name}
                tooltipVariant="error"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    [e.target.name]: e.target.value,
                  });

                  setError({
                    ...error,
                    error_for_product_name: false,
                  });
                }}
              />
            </section>
            <section className="md:col-span-1 col-span-2">
              <CSelect
                id="product_category_id"
                name="product_category_id"
                label="Product Category"
                value={data.product_category_id}
                errorQuery={error.error_for_product_category_id}
                tooltip={error.error_for_product_category_id}
                tooltipPosition="top-start"
                tooltipContent="Product category is required"
                tooltipVariant="error"
                loading={
                  isLoadingGetProductCategory || isFetchingGetProductCategory
                }
                onClick={handleGetProductCategoryNameList}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_category_id: e ? e.value : "",
                  });

                  setError({
                    ...error,
                    error_for_product_category_id: false,
                  });
                }}
                options={productCategoryNameList}
              />
            </section>
            <section className="md:col-span-1 col-span-2">
              <CSelect
                id="product_quantity"
                name="product_quantity"
                label="Product Quantity"
                value={data.product_quantity}
                errorQuery={error.error_for_product_quantity}
                tooltip={error.error_for_product_quantity}
                tooltipPosition="top-start"
                tooltipContent="Product quantity is required"
                tooltipVariant="error"
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_quantity: e ? e.value : "",
                  });

                  setError({
                    ...error,
                    error_for_product_quantity: false,
                  });
                }}
                options={PRODUCT_QUANTITY}
              />
            </section>

            <section className="md:col-span-1 col-span-2">
              <CSelect
                id="delivery_charge"
                name="delivery_charge"
                label="Delivery Charge Type"
                errorQuery={error.error_for_delivery_charge}
                tooltip={error.error_for_delivery_charge}
                tooltipPosition="top-start"
                tooltipContent="Delivery charge is required"
                tooltipVariant="error"
                value={data.delivery_charge}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    delivery_charge: e ? e.value : "",
                  });
                  setError({
                    ...error,
                    error_for_delivery_charge: false,
                  });
                }}
                options={DELIVERY_TYPE}
              />
            </section>

            <section className="col-span-2">
              <CFileInput
                id="product_images"
                name="product_images"
                label="Product Images"
                multiple
                accept="image/*"
                files={data.product_images}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_images: e?.target?.files,
                  });
                }}
              />
            </section>
            <section className="col-span-2">
              <section>
                <CTextArea
                  id="description"
                  name="description"
                  placeholder="Enter your Product Description"
                  label="Product Description"
                  value={data.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setData({
                      ...data,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </section>
            </section>
          </aside>

          {/* //button  */}

          <section className="flex justify-end items-center mt-5">
            <CButton
              variant="outline"
              type="submit"
              loading={isLoadingCreateProduct}
            >
              Submit
            </CButton>
          </section>
        </form>
      </MainCard>
    </main>
  );
};

export default AddNewProducts;
