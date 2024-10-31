import { CButton, CInput } from "../../../../Utils";
import MainCard from "../../../../Utils/CCard/MainCard";
import CFileInput from "../../../../Utils/CFileInput/CFileInput";
import CTextArea from "../../../../Utils/CTextArea/CTextArea";
import { CategoryFormProps } from "../productCategory_type";
import { FaTrashCan } from "react-icons/fa6";

const CategoryForm = ({
  data,
  setData,
  error,
  setError,
  index,
}: CategoryFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    // Update only the specific index without affecting other entries
    setData((prevData) => {
      const updatedData = [...prevData]; // Copy the previous data array

      // Update the specific index with new data
      if (files) {
        updatedData[index] = { ...updatedData[index], product_image: files[0] };
      } else {
        updatedData[index] = { ...updatedData[index], [name]: value };
      }

      return updatedData;
    });

    // Reset the error if editing product category
    if (name === "product_category_name") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_product_category_name: false,
      }));
    }
  };

  const handleRemove = () => {
    // Remove the specific index
    //if data length is 1 then don't remove
    setData((prevData) => {
      if (prevData.length === 1) {
        setError((prevError: any) => ({
          ...prevError,
          error_for_product_category_name: true,
        }));
        return prevData;
      }
      return prevData.filter((_, i) => i !== index);
    });
  };
  // console.log(index);
  return (
    <MainCard
      title={`Category - ${index + 1}`}
      secondary={
        <CButton
          variant="solid"
          color="text-primary"
          tooltip
          id="delete"
          tooltipContent="Delete"
          tooltipPosition="top-end"
          onClick={handleRemove}
        >
          <FaTrashCan size={18} color="red" />
        </CButton>
      }
    >
      {/* Product Category Input */}
      <main className="space-y-4">
        <section>
          <CInput
            type="text"
            id="product_category"
            name="product_category_name"
            placeholder="Enter your Product Category"
            label="Product Category"
            tooltip={error.error_for_product_category_name}
            tooltipPosition="right"
            tooltipContent="Product category is required"
            errorQuery={error.error_for_product_category_name}
            value={data.product_category_name}
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
            value={data.description}
          />
        </section>

        {/* Product Image Upload */}
        <>
          <CFileInput
            type="file"
            id="product_image"
            name="product_image"
            placeholder="Upload Product Image"
            label="Product Image"
            files={data.product_image}
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleChange}
          />
        </>
      </main>
    </MainCard>
  );
};

export default CategoryForm;
