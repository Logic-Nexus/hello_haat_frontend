import React, { useState } from "react";
import MainCard from "../../../../Utils/CCard/MainCard";
import { CButton, CInput, CSelect } from "../../../../Utils";

type productDataType = {
  product_name: string;
  description: string;
  product_quantity: string;
  delivery_charge: string;
  product_category_id: string;
  product_images: string | File | null;
};

const AddNewProducts = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {};
  return (
    <>
      <MainCard title={`Create Product`}>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </section>

          <section>
            <CSelect
              id="product_category_id"
              name="product_category_id"
              label="Product Category"
              value={data.product_category_id}
              onChange={handleChange}
              options={[
                { value: "OPERATOR", label: "Operator" },
                { value: "REPRESENTATIVE", label: "Representative" },
                { value: "RAIDER", label: "Rider" },
              ]}
            />
          </section>
          <section>
            <CSelect
              id=""
              name="product_quantity"
              label="Product Quantity"
              value={data.product_quantity}
              onChange={handleChange}
              options={[
                { value: "OPERATOR", label: "Operator" },
                { value: "REPRESENTATIVE", label: "Representative" },
                { value: "RAIDER", label: "Rider" },
              ]}
            />
          </section>
        </form>
      </MainCard>
    </>
  );
};

export default AddNewProducts;
