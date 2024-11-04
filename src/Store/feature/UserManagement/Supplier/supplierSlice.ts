import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSingleSupplier: null,
};

export const supplierSlice = createSlice({
  name: "supplierSlice",
  initialState,
  reducers: {
    setSelectedSingleSupplier: (state, action) => {
      state.selectedSingleSupplier = action.payload;
    },
  },
});

export const { setSelectedSingleSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;
