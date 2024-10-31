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
import { useProductCategoryNameListDataQuery } from "../../../../Store/feature/Product_management/ProductCategory/ProductCategory_api_slice";
import { convertDataForSelect } from "../../../../constant";

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

  const handleSubmit = async () => {
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
  const {
    data: getProductCategoryData,
    isLoading: isLoadingGetProductCategory,
    isFetching: isFetchingGetProductCategory,
  } = useProductCategoryNameListDataQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: true,
    }
  );

  const productCategoryNameList = useMemo(() => {
    if (getProductCategoryData?.status === 200) {
      return convertDataForSelect(
        getProductCategoryData?.data,
        "product_category_name"
      );
    }
  }, [getProductCategoryData?.data, getProductCategoryData?.status]);

  return (
    <main className="lg:h-auto h-[calc(100vh-9.9rem)]">
      <MainCard title={`Create Product`}>
        <form onSubmit={handleSubmit}>
          <aside className="grid md:grid-cols-2 gap-4">
            <section>
              <CInput
                type="text"
                id="product_name"
                name="product_name"
                placeholder="Enter your Product Name"
                label="Product Name"
                tooltip={error.error_for_product_name}
                tooltipPosition="right"
                tooltipContent="Product category is required"
                errorQuery={error.error_for_product_name}
                value={data.product_name}
                tooltipVariant="error"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </section>
            <section>
              <CInput
                type="text"
                id="description"
                name="description"
                placeholder="Enter your Product Description"
                label="Product Description"
                tooltip={error.error_for_description}
                tooltipPosition="right"
                tooltipContent="Product category is required"
                errorQuery={error.error_for_description}
                value={data.description}
                tooltipVariant="error"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setData({
                    ...data,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </section>

            <section>
              <CSelect
                id="product_category_id"
                name="product_category_id"
                label="Product Category"
                value={data.product_category_id}
                loading={
                  isLoadingGetProductCategory || isFetchingGetProductCategory
                }
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_category_id: e ? e.value : "",
                  });
                }}
                options={productCategoryNameList}
              />
            </section>
            <section>
              <CSelect
                id="product_quantity"
                name="product_quantity"
                label="Product Quantity"
                value={data.product_quantity}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_quantity: e ? e.value : "",
                  });
                }}
                options={PRODUCT_QUANTITY}
              />
            </section>

            <section>
              <CSelect
                id="delivery_charge"
                name="delivery_charge"
                label="Delivery Charge Type"
                value={data.delivery_charge}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    delivery_charge: e ? e.value : "",
                  });
                }}
                options={DELIVERY_TYPE}
              />
            </section>

            <section>
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
          </aside>

          {/* //button  */}

          <section className="flex justify-end items-center mt-5">
            <CButton
              variant="outline"
              type="submit"
              onClick={handleSubmit}
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
