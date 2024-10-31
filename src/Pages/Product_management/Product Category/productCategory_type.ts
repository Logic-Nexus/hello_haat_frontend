import React from "react";

export type categoryDataType = {
  product_category_name: string;
  description: string;
  product_image: File | null;
};

export interface CategoryFormProps {
  data: categoryDataType;
  setData: React.Dispatch<React.SetStateAction<categoryDataType[]>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  index: number;
}
