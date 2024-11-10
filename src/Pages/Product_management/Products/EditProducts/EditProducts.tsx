import React, { useCallback, useEffect, useMemo, useState } from "react";
import CTextArea from "../../../../Utils/CTextArea/CTextArea";
import { CButton, CInput, CSelect } from "../../../../Utils";
import {
  DELIVERY_TYPE,
  PRODUCT_QUANTITY,
} from "../product_constant/product_constant";
import { useLazyProductCategoryNameListDataQuery } from "../../../../Store/feature/Product_management/ProductCategory/ProductCategory_api_slice";
import { convertDataForSelect } from "../../../../constant";
import { useAppSelector } from "../../../../Store/Store";
import { useUpdateProductMutation } from "../../../../Store/feature/Product_management/Product/products_api_slice";
import { cToastify } from "../../../../Shared";

const EditProducts = ({
  setOpenEditModal,
  openEditModal,
}: {
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditModal: boolean;
}) => {
  const { selectSingleProduct } = useAppSelector(
    (state) => state.productSlice
  ) as any;

  interface ProductData {
    product_name: string;
    description: string;
    product_quantity: string;
    delivery_charge: string;
    product_category_id: string;
  }

  const [data, setData] = useState<ProductData>({
    product_name: "",
    description: "",
    product_quantity: "",
    delivery_charge: "",
    product_category_id: "",
  });

  useEffect(() => {
    setData({
      product_name: selectSingleProduct?.product_name,
      product_category_id: selectSingleProduct?.product_category?.id,
      product_quantity: selectSingleProduct?.product_quantity_type,
      description: selectSingleProduct?.description,
      delivery_charge: selectSingleProduct?.delivery_charge_type,
    });
  }, [
    selectSingleProduct?.delivery_charge_type,
    selectSingleProduct?.description,
    selectSingleProduct?.product_category?.id,
    selectSingleProduct?.product_name,
    selectSingleProduct?.product_quantity_type,
  ]);

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

  const handleGetProductCategoryNameList = useCallback(async () => {
    try {
      await productCategoryNameListData({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting product category name list:", error);
    }
  }, [productCategoryNameListData]);

  //useEffect for get product category name list data
  useEffect(() => {
    if (!openEditModal) return;
    handleGetProductCategoryNameList();
    return () => {};
  }, [handleGetProductCategoryNameList, openEditModal]);

  //handleSubmitEdit
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("data", data);
    const productId = selectSingleProduct?.id;

    if (!productId) {
      cToastify({
        type: "error",
        message: "Product id not found",
      });
      return;
    }

    const body: Partial<ProductData> = {};

    for (const key in data) {
      const typedKey = key as keyof ProductData;
      if (data[typedKey]) {
        body[typedKey] = data[typedKey];
      }
    }

    try {
      await updateProduct({
        productId,
        body,
      });
      cToastify({
        type: "success",
        message: "Product updated successfully",
      });
      setOpenEditModal(false);
    } catch (error: any) {
      if (error.status === 400) {
        cToastify({
          type: "error",
          message: error.data.message || "Error uploading product",
        });
      }
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitEdit}>
        <aside className="space-y-4">
          <section>
            <CInput
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Enter your Product Name"
              label="Product Name"
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
            <CSelect
              id="product_category_id"
              name="product_category_id"
              label="Product Category"
              defaultValue={productCategoryNameList?.find(
                (item: any) => item?.value === data?.product_category_id
              )}
              loading={
                isLoadingGetProductCategory || isFetchingGetProductCategory
              }
              onClick={handleGetProductCategoryNameList}
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
              key={data?.product_quantity}
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
          <CButton variant="outline" type="submit" loading={isLoading}>
            Update Product
          </CButton>
        </section>
      </form>
    </>
  );
};

export default EditProducts;
