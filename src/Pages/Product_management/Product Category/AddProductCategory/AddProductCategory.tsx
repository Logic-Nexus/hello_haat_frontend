import React, { useEffect, useState } from "react";
import { categoryDataType } from "../productCategory_type";
import MainCard from "../../../../Utils/CCard/MainCard";
import { CButton } from "../../../../Utils";
import { IoAddCircle } from "react-icons/io5";
import { For } from "easy-beauty-components---react";
import CategoryForm from "../CategoryForm/CategoryForm";
import { useCreateProductCategoryMutation } from "../../../../Store/feature/Product_management/ProductCategory/ProductCategory_api_slice";
import { errorAlert } from "../../../../Utils/alert-function";
import { useNavigate } from "react-router-dom";
import { cToastify } from "../../../../Shared";

const DEFAULT_CATEGORY_DATA: categoryDataType[] = [
  { product_category_name: "", description: "", product_image: null },
];

const AddProductCategory = () => {
  const navigate = useNavigate();
  // State hooks to manage form data, error, and loading status
  const [data, setData] = useState<categoryDataType[]>(DEFAULT_CATEGORY_DATA);

  const [error, setError] = useState({
    error_for_product_category_name: false,
    error_for_product_image: false,
  });

  // Add more input fields to the form
  const handleAddMore = () => {
    const newData = [DEFAULT_CATEGORY_DATA[0], ...data];
    setData(newData);
  };

  const [
    createProductCategory,
    { isLoading, isSuccess, isError, error: createError, data: createData },
  ] = useCreateProductCategoryMutation();

  useEffect(() => {
    // console.log(isSuccess);
    if (isSuccess && createData?.status === 201) {
      cToastify({
        type: "success",
        message: createData?.message || "Product Category Added Successfully",
      });
      navigate("/vendor/product_category");
    }
  }, [createData?.message, createData?.status, isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      errorAlert({
        text: createError?.data?.message || "Something went wrong",
      });
    }
  }, [createError?.data?.message, isError]);

  // handleSubmit function to process form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data);

    //check if product_category_name is empty
    const checkEmpty = data.some((item) => item.product_category_name === "");
    if (checkEmpty) {
      setError({
        error_for_product_category_name: true,
        error_for_product_image: false,
      });
      return;
    }

    const formData = new FormData();
    // Convert dataArray to a JSON string and append it to FormData
    formData.append("product_categories", JSON.stringify(data));

    // If you want to send files (like images) for each object in dataArray
    data.forEach((item) => {
      if (item.product_image) {
        formData.append(`image`, item.product_image); // Assuming 'image' is a File object
      }
    });

    try {
      await createProductCategory(formData);
      // console.log(data);
      setData(DEFAULT_CATEGORY_DATA);
    } catch (error) {
      console.log("error", error);
    }
  };
  // console.log(data.product_image);

  return (
    <>
      <MainCard
        title={`Product Category`}
        secondary={
          <>
            <CButton
              variant="solid"
              color="text-primary"
              tooltip
              id="tooltip"
              tooltipContent="Add More Category"
              tooltipPosition="top-end"
              onClick={handleAddMore}
            >
              <IoAddCircle size={30} />
            </CButton>
          </>
        }
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <section className="h-[530px] overflow-y-auto overflow-x-hidden ">
            <For of={data}>
              {(item, index) => (
                <React.Fragment key={index}>
                  <CategoryForm
                    data={item}
                    setData={setData}
                    error={error}
                    setError={setError}
                    index={index}
                  />
                </React.Fragment>
              )}
            </For>
          </section>
          {/* Submit Button */}

          <section className="flex justify-end">
            <CButton
              variant="outline"
              btnTitle="Submit"
              className="mt-5"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            />
          </section>
        </form>
      </MainCard>
    </>
  );
};

export default AddProductCategory;
