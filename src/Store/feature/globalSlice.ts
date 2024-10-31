/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState: {
    links: [],
    profileData: {},
    authorizeVendorDetails: {},
  },
  reducers: {
    setLinksStore: (state, action) => {
      state.links = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setVendorDetails: (state, action) => {
      state.authorizeVendorDetails = action.payload;
    },
  },
});

export const { setLinksStore, setProfileData, setVendorDetails } =
  globalSlice.actions;

export default globalSlice.reducer;
