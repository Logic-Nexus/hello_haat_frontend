import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    selectSingleProduct: {},
  },
  reducers: {
    setSelectSingleProduct: (state, action) => {
      state.selectSingleProduct = action.payload;
    },
  },
});

export const { setSelectSingleProduct } = productSlice.actions;

export default productSlice.reducer;
