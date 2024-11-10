import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./api/apiSlice";
import globalSlice from "./feature/globalSlice";
import productCategorySlice from "./feature/Product_management/ProductCategory/productCategory_slice";
import productSlice from "./feature/Product_management/Product/products_slice";
import employeeSlice from "./feature/UserManagement/Employee_Slice/Employee_Slice";
import zoneSlice from "./feature/Zone/zoneSlice";
import supplierSlice from "./feature/UserManagement/Supplier/supplierSlice";
import productPurchaseSlice from "./feature/Product_management/PurchaseProduct/purchaseSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    globalSlice,
    productCategorySlice,
    productSlice,
    employeeSlice,
    zoneSlice,
    supplierSlice,
    productPurchaseSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
