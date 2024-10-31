import React, { useEffect } from "react";
import { useGetSingleVendorQuery } from "../../Store/feature/Vendors/vendors_api_slice";
import { useAppDispatch } from "../../Store/Store";
import { setVendorDetails } from "../../Store/feature/globalSlice";
import { decryptData } from "../../constant/encrytion";

export const GlobalContext = React.createContext({});
const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const userData = decryptData("userData");
  const {
    data: vendorDetails,
    isLoading,
    isSuccess,
  } = useGetSingleVendorQuery(
    {
      id: userData?.user?.vendorId,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !userData?.user?.vendorId,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setVendorDetails(vendorDetails?.data));
    }
  }, [dispatch, isSuccess, vendorDetails?.data]);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
