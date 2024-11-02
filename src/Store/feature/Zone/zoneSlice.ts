import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSingleZone: {},
};

export const zoneSlice = createSlice({
  name: "zone",
  initialState,
  reducers: {
    setSelectedSingleZone: (state, action) => {
      state.selectedSingleZone = action.payload;
    },
  },
});

export const { setSelectedSingleZone } = zoneSlice.actions;

export default zoneSlice.reducer;
