import React, { useMemo } from "react";
import MainCard from "../../../../Utils/CCard/MainCard";
import { CButton, CInput, CSelect } from "../../../../Utils";
import { useCreateProductPurchaseMutation } from "../../../../Store/feature/Product_management/PurchaseProduct/PurchaseProduct_api_slice";
import { useLazyGetSuppliersNameListQuery } from "../../../../Store/feature/UserManagement/Supplier/supplier_api_slice";
import { convertDataForSelect } from "../../../../constant";
import { useLazyGetProductsNameListQuery } from "../../../../Store/feature/Product_management/Product/products_api_slice";
import { useLazyGetZoneNameListQuery } from "../../../../Store/feature/Zone/zone_api_slice";
import { cToastify } from "../../../../Shared";
import { useNavigate } from "react-router-dom";
import moment from "moment";

// {
//     // "purchase_date":"2024/11/06",
//     "supplierId":"cm308407q0001x6c8fdyn7obn",
//     "productId":"cm35z3i0f0001qysxxbv9xri4",
//     "product_quantity":15,
//     "product_purchase_price":50,
//     "product_selling_price":65,
//     "product_retail_price":60,
//     "product_old_mrp":45,
//     "special_offer":"15% Extra",
//     "zoneId":"cm2xn09y20003o813z01r7dp9"
// }

type data = {
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

const DEFAULT_DATA: data = {
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

const CreateProductPurchase = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState<data>(DEFAULT_DATA);

  const [error, setError] = React.useState({
    error_for_supplierId: false,
    error_for_productId: false,
    error_for_product_quantity: false,
    error_for_product_purchase_price: false,
    error_for_product_selling_price: false,
    error_for_product_retail_price: false,
    error_for_special_offer: false,
    error_for_zoneId: false,
  });

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

  const handleGetSupplierNameList = async () => {
    try {
      await getSuppliersNameList({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting product category name list:", error);
    }
  };

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

  const handleGetProductsNameList = async () => {
    try {
      await getProductsNameList({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting products name list:", error);
    }
  };

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

  const handleGetZoneNameList = async () => {
    try {
      await getZoneNameList({
        status: "ACTIVE",
      });
    } catch (error) {
      console.error("Error getting zone name list:", error);
    }
  };

  const [createProductPurchase, { isLoading: isLoadingCreateProductPurchase }] =
    useCreateProductPurchaseMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !data.supplierId ||
      !data.productId ||
      !data.product_quantity ||
      !data.product_purchase_price ||
      !data.product_selling_price ||
      !data.product_retail_price ||
      !data.special_offer ||
      !data.zoneId
    ) {
      setError({
        error_for_supplierId: !data.supplierId,
        error_for_productId: !data.productId,
        error_for_product_quantity: !data.product_quantity,
        error_for_product_purchase_price: !data.product_purchase_price,
        error_for_product_selling_price: !data.product_selling_price,
        error_for_product_retail_price: !data.product_retail_price,
        error_for_special_offer: !data.special_offer,
        error_for_zoneId: !data.zoneId,
      });
      return;
    }

    try {
      const res = await createProductPurchase(data)?.unwrap();
      if (res.status === 201) {
        cToastify({
          type: "success",
          message: "Product Purchase created successfully",
        });

        //back to product list
        navigate(-1);
        setData(DEFAULT_DATA);
      }
    } catch (error: any) {
      console.error("Error creating product purchase:", error);
      if (error.status === 400) {
        cToastify({
          type: "error",
          message: error.data.message || "Error uploading image",
        });
      }
    }

    // console.log("submit");
  };
  return (
    <main className="lg:h-auto h-[calc(100vh-9.9rem)]">
      <MainCard title={`Create Product Purchase`}>
        <form onSubmit={handleSubmit}>
          <aside className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <section className="md:col-span-1 col-span-2">
              <CInput
                type="datetime-local"
                id="purchase_date"
                name="purchase_date"
                label="Purchase Date"
                value={data.purchase_date}
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
                errorQuery={error.error_for_supplierId}
                tooltip={error.error_for_supplierId}
                tooltipPosition="top-start"
                tooltipContent="Supplier is required"
                tooltipVariant="error"
                loading={
                  isLoadingGetSuppliersNameList ||
                  isFetchingGetSuppliersNameList
                }
                onClick={handleGetSupplierNameList}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    supplierId: e ? e.value : "",
                  });

                  setError({
                    ...error,
                    error_for_supplierId: false,
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
                errorQuery={error.error_for_productId}
                tooltip={error.error_for_productId}
                tooltipPosition="top-start"
                tooltipContent="Products is required"
                tooltipVariant="error"
                loading={isLoadingGetProducts || isFetchingGetProducts}
                onClick={handleGetProductsNameList}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    productId: e ? e.value : "",
                  });

                  setError({
                    ...error,
                    error_for_productId: false,
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
                errorQuery={error.error_for_product_quantity}
                tooltip={error.error_for_product_quantity}
                tooltipPosition="top-start"
                tooltipContent="Product Quantity is required"
                tooltipVariant="error"
                value={data.product_quantity}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_quantity: e.target.value,
                  });

                  setError({
                    ...error,
                    error_for_product_quantity: false,
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
                errorQuery={error.error_for_product_purchase_price}
                tooltip={error.error_for_product_purchase_price}
                tooltipPosition="top-start"
                tooltipContent="Product Purchase Price is required"
                tooltipVariant="error"
                value={data.product_purchase_price}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_purchase_price: e.target.value,
                  });

                  setError({
                    ...error,
                    error_for_product_purchase_price: false,
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
                errorQuery={error.error_for_product_selling_price}
                tooltip={error.error_for_product_selling_price}
                tooltipPosition="top-start"
                tooltipContent="Product Selling Price is required"
                tooltipVariant="error"
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_selling_price: e.target.value,
                  });

                  setError({
                    ...error,
                    error_for_product_selling_price: false,
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
                errorQuery={error.error_for_product_retail_price}
                tooltip={error.error_for_product_retail_price}
                tooltipPosition="top-start"
                tooltipContent="Product Retail Price is required"
                tooltipVariant="error"
                value={data.product_retail_price}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    product_retail_price: e.target.value,
                  });

                  setError({
                    ...error,
                    error_for_product_retail_price: false,
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
                errorQuery={error.error_for_special_offer}
                tooltip={error.error_for_special_offer}
                tooltipPosition="top-start"
                tooltipContent="Special Offer is required"
                tooltipVariant="error"
                onChange={(e: any) => {
                  setData({
                    ...data,
                    special_offer: e.target.value,
                  });

                  setError({
                    ...error,
                    error_for_special_offer: false,
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
                errorQuery={error.error_for_zoneId}
                tooltip={error.error_for_zoneId}
                tooltipPosition="top-start"
                tooltipContent="Zone is required"
                tooltipVariant="error"
                loading={isLoadingGetZoneNameList || isFetchingGetZoneNameList}
                onClick={handleGetZoneNameList}
                onChange={(e: any) => {
                  setData({
                    ...data,
                    zoneId: e ? e.value : "",
                  });

                  setError({
                    ...error,
                    error_for_zoneId: false,
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
              loading={isLoadingCreateProductPurchase}
            >
              Submit
            </CButton>
          </section>
        </form>
      </MainCard>
    </main>
  );
};

export default CreateProductPurchase;
