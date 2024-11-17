import { createSlice } from "@reduxjs/toolkit";

export const productPurchaseSlice = createSlice({
  name: "productPurchaseSlice",
  initialState: {
    selectSingleProductPurchase: {},
  },
  reducers: {
    setSelectSingleProductPurchase: (state, action) => {
      state.selectSingleProductPurchase = action.payload;
    },
  },
});

export const { setSelectSingleProductPurchase } = productPurchaseSlice.actions;

export default productPurchaseSlice.reducer;
