import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: {
    selectSingleEmployee: {},
  },
  reducers: {
    setSelectSingleEmployee: (state, action) => {
      state.selectSingleEmployee = action.payload;
    }
  },
});

export const {setSelectSingleEmployee} = employeeSlice.actions;

export default employeeSlice.reducer;