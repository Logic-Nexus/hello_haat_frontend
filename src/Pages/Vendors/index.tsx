import { useState } from "react";
import { useGetVendorsQuery } from "../../Store/feature/Vendors/vendors_api_slice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Store/feature/Auth_slice/AuthApi_Slice";
import { CButton, CInput, CModal } from "../../Utils";
import MainCard from "../../Utils/CCard/MainCard";
import { cToastify } from "../../Shared";
import { encryptData } from "../../constant/encrytion";

const Vendors = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectVendor, setSelectVendor] = useState<any>(null);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate() as any;

  const {
    data: vendors,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetVendorsQuery(
    {
      status: "ACTIVE",
      pagination: true,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  const [login, { isLoading: loginVendorAdminLoading }] = useLoginMutation();
  const handleVendorAdminLogin = async (vendor: any) => {
    try {
      const body = {
        username: vendor?.users?.[0]?.username,
        password: password,
      };
      const res = await login(body).unwrap();

      if (res?.status === 200) {
        localStorage.removeItem("userData");
        const makeEncryptedData = encryptData(res?.data);
        if (makeEncryptedData)
          localStorage.setItem("userData", makeEncryptedData);
        navigate("/vendor");
      }
    } catch (err: any) {
      console.log(err);
      setPassword("");
      if (err?.status === 400) {
        cToastify({
          type: "error",
          message: err?.data?.message,
        });
      }
    }
  };

  return (
    <main className="p-4">
      {(isLoading || isFetching) && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {error && <div>{error}</div>}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors?.data?.results && vendors?.data?.results?.length > 0 ? (
          vendors?.data?.results?.map((vendor: any) => (
            <div
              key={vendor?.id}
              className="p-4 bg-primary text-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 hover:shadow-lg hover:bg-cyan-950 cursor-pointer transition-all duration-500 ease-in-out"
              onClick={() => {
                setSelectVendor(vendor);
                setOpenModal(true);
              }}
            >
              {vendor?.vendor_image?.url && (
                <section className="mb-4">
                  <img
                    src={vendor?.vendor_image?.url}
                    alt="vendor_image"
                    className="w-24 h-24 object-cover rounded-full"
                    loading="lazy"
                    decoding="async"
                  />
                </section>
              )}
              <h2>{vendor?.name}</h2>
              <p>{vendor?.address}</p>
              <p>{vendor?.phone}</p>
              {/* //vendor creation time */}
              <p>
                Created At:
                {moment(vendor?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
          ))
        ) : (
          <div>No vendors found</div>
        )}
      </section>

      <CModal
        title={`Login as ${selectVendor?.name}`}
        open={openModal}
        onClose={(value: boolean) => {
          setOpenModal(value);
        }}
      >
        <MainCard>
          <CInput
            type="text"
            id="username"
            name="username"
            label="Username"
            value={selectVendor?.users?.[0]?.username}
            disabled={true}
          />
          <CInput
            type="text"
            id="password"
            name="password"
            label="Password"
            value={selectVendor?.users?.[0]?.password}
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />

          <section className="mt-4">
            <CButton
              variant="contained"
              loading={loginVendorAdminLoading}
              fullWidth
              textUpperCased
              onClick={() => {
                handleVendorAdminLogin(selectVendor);
              }}
            >
              Login
            </CButton>
          </section>
        </MainCard>
      </CModal>
    </main>
  );
};

export default Vendors;
