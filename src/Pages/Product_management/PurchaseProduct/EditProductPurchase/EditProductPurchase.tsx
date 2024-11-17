import React, { useCallback, useEffect, useMemo } from "react";
import { CButton, CInput, CSelect } from "../../../../Utils";
import moment from "moment";
import { useAppSelector } from "../../../../Store/Store";

import { convertDataForSelect } from "../../../../constant";
import { useLazyGetZoneNameListQuery } from "../../../../Store/feature/Zone/zone_api_slice";
import { useLazyGetProductsNameListQuery } from "../../../../Store/feature/Product_management/Product/products_api_slice";
import { useLazyGetSuppliersNameListQuery } from "../../../../Store/feature/UserManagement/Supplier/supplier_api_slice";
type DATA_TYPE = {
  purchase_date: string;
  supplierId: string;
  productId: string;
  product_quantity: string;
  product_purchase_price: string;
  product_selling_price: string;
  product_retail_price: string;
  product_old_mrp: string;
  special_offer: string;
  zoneId: string;
};

const DEFAULT_DATA: DATA_TYPE = {
  purchase_date: moment().format("YYYY-MM-DDTHH:mm"),
  supplierId: "",
  productId: "",
  product_quantity: "",
  product_purchase_price: "",
  product_selling_price: "",
  product_retail_price: "",
  product_old_mrp: "",
  special_offer: "",
  zoneId: "",
};
const EditProductPurchase = ({
  // setOpenEditModal,
  openEditModal,
}: {
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  openEditModal: boolean;
}) => {
  const [data, setData] = React.useState<DATA_TYPE>(DEFAULT_DATA);
  const { selectSingleProductPurchase } = useAppSelector(
    (state) => state.productPurchaseSlice
  ) as any;

  //   console.log(selectSingleProductPurchase, "selectSingleProductPurchase");

  useEffect(() => {
    setData({
      purchase_date: selectSingleProductPurchase?.purchase_date,
      supplierId: selectSingleProductPurchase?.supplierId,
      productId: selectSingleProductPurchase?.productId,
      product_quantity: selectSingleProductPurchase?.product_quantity,
      product_purchase_price:
        selectSingleProductPurchase?.product_purchase_price,
      product_selling_price: selectSingleProductPurchase?.product_selling_price,
      product_retail_price: selectSingleProductPurchase?.product_retail_price,
      product_old_mrp: selectSingleProductPurchase?.product_old_mrp,
      special_offer: selectSingleProductPurchase?.special_offer,
      zoneId: selectSingleProductPurchase?.zoneId,
    });
  }, [
    selectSingleProductPurchase?.productId,
    selectSingleProductPurchase?.product_old_mrp,
    selectSingleProductPurchase?.product_purchase_price,
    selectSingleProductPurchase?.product_quantity,
    selectSingleProductPurchase?.product_retail_price,
    selectSingleProductPurchase?.product_selling_price,
    selectSingleProductPurchase?.purchase_date,
    selectSingleProductPurchase?.special_offer,
    selectSingleProductPurchase?.supplierId,
    selectSingleProductPurchase?.zoneId,
  ]);

  // get suppliers name list
  const [
    getSuppliersNameList,
    {
      data: suppliersNameListData,
      isLoading: isLoadingGetSuppliersNameList,
      isFetching: isFetchingGetSuppliersNameList,
    },
  ] = useLazyGetSuppliersNameListQuery();

  const suppliersNameList = useMemo(() => {
    if (suppliersNameListData?.status === 200) {
      return convertDataForSelect(suppliersNameListData?.data, "supplierName");
    }
  }, [suppliersNameListData?.data, suppliersNameListData?.status]);

  const handleGetSupplierNameList = useCallback(async () => {
    try {
      await getSuppliersNameList({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting product category name list:", error);
    }
  }, [getSuppliersNameList]);

  //handleGetProductsNameList
  const [
    getProductsNameList,
    {
      data: getProductsData,
      isLoading: isLoadingGetProducts,
      isFetching: isFetchingGetProducts,
    },
  ] = useLazyGetProductsNameListQuery();

  const productsNameList = useMemo(() => {
    if (getProductsData?.status === 200) {
      return convertDataForSelect(getProductsData?.data, "product_name");
    }
  }, [getProductsData?.data, getProductsData?.status]);

  const handleGetProductsNameList = useCallback(async () => {
    try {
      await getProductsNameList({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting products name list:", error);
    }
  }, [getProductsNameList]);

  //zone name list
  const [
    getZoneNameList,
    {
      data: zoneNameListData,
      isLoading: isLoadingGetZoneNameList,
      isFetching: isFetchingGetZoneNameList,
    },
  ] = useLazyGetZoneNameListQuery();

  const zoneNameList = useMemo(() => {
    if (zoneNameListData?.status === 200) {
      return convertDataForSelect(zoneNameListData?.data, "zone_name");
    }
  }, [zoneNameListData?.data, zoneNameListData?.status]);

  const handleGetZoneNameList = useCallback(async () => {
    try {
      await getZoneNameList({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting zone name list:", error);
    }
  }, [getZoneNameList]);

  //useEffect for get product category name list data
  useEffect(() => {
    if (!openEditModal) return;
    handleGetZoneNameList();
    handleGetProductsNameList();
    handleGetSupplierNameList();
    return () => {};
  }, [
    openEditModal,
    handleGetZoneNameList,
    handleGetProductsNameList,
    handleGetSupplierNameList,
  ]);

  // //   ================================ update ================================

  // const [updateProductPurchase, { isLoading }] =
  //   useUpdateProductPurchaseMutation();

  // const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // console.log("data", data);
  //   const productPurchaseId = selectSingleProductPurchase?.id;

  //   if (!productPurchaseId) {
  //     cToastify({
  //       type: "error",
  //       message: "Product id not found",
  //     });
  //     return;
  //   }

  //   //if not same then update the data

  //   if (
  //     data.purchase_date === selectSingleProductPurchase.purchase_date &&
  //     data.supplierId === selectSingleProductPurchase.supplierId &&
  //     data.productId === selectSingleProductPurchase.productId &&
  //     data.product_quantity === selectSingleProductPurchase.product_quantity &&
  //     data.product_purchase_price ===
  //       selectSingleProductPurchase.product_purchase_price &&
  //     data.product_selling_price ===
  //       selectSingleProductPurchase.product_selling_price &&
  //     data.product_retail_price ===
  //       selectSingleProductPurchase.product_retail_price &&
  //     data.product_old_mrp === selectSingleProductPurchase.product_old_mrp &&
  //     data.special_offer === selectSingleProductPurchase.special_offer &&
  //     data.zoneId === selectSingleProductPurchase.zoneId
  //   ) {
  //     cToastify({
  //       type: "error",
  //       message: "No changes found to update",
  //     });
  //     return;
  //   }

  //   const body: Partial<DATA_TYPE> = {};

  //   for (const key in data) {
  //     if (
  //       data[key as keyof DATA_TYPE] !==
  //       selectSingleProductPurchase[key as keyof DATA_TYPE]
  //     ) {
  //       const typedKey = key as keyof DATA_TYPE;
  //       if (data[typedKey]) {
  //         body[typedKey] = data[typedKey];
  //       }
  //     }
  //   }

  //   try {
  //     await updateProductPurchase({
  //       productPurchaseId,
  //       body,
  //     });
  //     cToastify({
  //       type: "success",
  //       message: "Product Purchase updated successfully",
  //     });
  //     setOpenEditModal(false);
  //   } catch (error: any) {
  //     if (error.status === 400) {
  //       cToastify({
  //         type: "error",
  //         message: error.data.message || "Error uploading product Purchase",
  //       });
  //     }
  //     console.error("Error updating product Purchase:", error);
  //   }
  // };

  return (
    <>
      <form>
        <aside className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <section className="md:col-span-1 col-span-2">
            <CInput
              type="datetime-local"
              id="purchase_date"
              name="purchase_date"
              label="Purchase Date"
              value={moment(data?.purchase_date).format("YYYY-MM-DDTHH:mm")}
              onChange={(e: any) => {
                setData({
                  ...data,
                  purchase_date: moment(e.target.value).format(
                    "YYYY-MM-DDTHH:mm"
                  ),
                });
              }}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CSelect
              id="supplierId"
              name="supplierId"
              label="Suppliers"
              value={data.supplierId}
              loading={
                isLoadingGetSuppliersNameList || isFetchingGetSuppliersNameList
              }
              onClick={handleGetSupplierNameList}
              onChange={(e: any) => {
                setData({
                  ...data,
                  supplierId: e ? e.value : "",
                });
              }}
              options={suppliersNameList}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CSelect
              id="productId"
              name="productId"
              label="Product Name"
              value={data.productId}
              loading={isLoadingGetProducts || isFetchingGetProducts}
              onClick={handleGetProductsNameList}
              onChange={(e: any) => {
                setData({
                  ...data,
                  productId: e ? e.value : "",
                });
              }}
              options={productsNameList}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CInput
              type="number"
              id="product_quantity"
              name="product_quantity"
              label="Product Quantity"
              value={data.product_quantity}
              onChange={(e: any) => {
                setData({
                  ...data,
                  product_quantity: e.target.value,
                });
              }}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CInput
              type="number"
              id="product_purchase_price"
              name="product_purchase_price"
              label="Product Purchase Price"
              value={data.product_purchase_price}
              onChange={(e: any) => {
                setData({
                  ...data,
                  product_purchase_price: e.target.value,
                });
              }}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CInput
              type="number"
              id="product_selling_price"
              name="product_selling_price"
              label="Product Selling Price"
              value={data.product_selling_price}
              onChange={(e: any) => {
                setData({
                  ...data,
                  product_selling_price: e.target.value,
                });
              }}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CInput
              type="number"
              id="product_retail_price"
              name="product_retail_price"
              label="Product Retail Price"
              value={data.product_retail_price}
              onChange={(e: any) => {
                setData({
                  ...data,
                  product_retail_price: e.target.value,
                });
              }}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CInput
              type="number"
              id="product_old_mrp"
              name="product_old_mrp"
              label="Product Old MRP"
              value={data.product_old_mrp}
              onChange={(e: any) => {
                setData({
                  ...data,
                  product_old_mrp: e.target.value,
                });
              }}
            />
          </section>
          <section className="md:col-span-1 col-span-2">
            <CInput
              type="text"
              id="special_offer"
              name="special_offer"
              label="Special Offer"
              value={data.special_offer}
              onChange={(e: any) => {
                setData({
                  ...data,
                  special_offer: e.target.value,
                });
              }}
            />
          </section>

          <section className="md:col-span-1 col-span-2">
            <CSelect
              id="zoneId"
              name="zoneId"
              label="Zone Name"
              value={data.zoneId}
              loading={isLoadingGetZoneNameList || isFetchingGetZoneNameList}
              onClick={handleGetZoneNameList}
              onChange={(e: any) => {
                setData({
                  ...data,
                  zoneId: e ? e.value : "",
                });
              }}
              options={zoneNameList}
            />
          </section>
        </aside>

        {/* //button  */}

        <section className="flex justify-end items-center mt-5">
          <CButton
            variant="outline"
            type="submit"
            // loading={isLoading}
          >
            Update
          </CButton>
        </section>
      </form>
    </>
  );
};

export default EditProductPurchase;
