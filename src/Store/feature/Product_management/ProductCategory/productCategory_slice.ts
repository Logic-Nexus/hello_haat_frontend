import { createSlice } from "@reduxjs/toolkit";

export const productCategorySlice = createSlice({
  name: "productCategorySlice",
  initialState: {
    selectSingleProductCategory: {},
  },
  reducers: {
    setSelectSingleProductCategory: (state, action) => {
      state.selectSingleProductCategory = action.payload;
    },
  },
});

export const { setSelectSingleProductCategory } = productCategorySlice.actions;

export default productCategorySlice.reducer;
