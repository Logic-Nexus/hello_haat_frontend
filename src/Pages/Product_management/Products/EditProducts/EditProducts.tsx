import React, { useState } from "react";
import CFileInput from "../../../../Utils/CFileInput/CFileInput";
import CTextArea from "../../../../Utils/CTextArea/CTextArea";
import { CButton, CInput, CSelect } from "../../../../Utils";
import { DELIVERY_TYPE, PRODUCT_QUANTITY } from "../product_constant/product_constant";

const EditProducts = () => {
  const [data, setData] = useState({
    product_name: "",
    product_category_id: "",
    product_quantity: "",
    product_price: "",
    description: "",
    delivery_type: "",
    delivery_charge: "",
    product_images: [],
  });

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <div>
      <form onSubmit={handleSubmitEdit}>
        <aside className="grid md:grid-cols-2 gap-4">
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
            loading={isLoadingEditProduct}
          >
            Submit
          </CButton>
        </section>
      </form>
    </div>
  );
};

export default EditProducts;
