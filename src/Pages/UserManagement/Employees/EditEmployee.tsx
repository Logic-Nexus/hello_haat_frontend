import { useEffect, useState } from "react";
import { CButton, CSelect } from "../../../Utils";
import Cinput from "../../../Utils/CInput/Cinput";
import CFileInput from "../../../Utils/CFileInput/CFileInput";
import { employeeDataType } from "../../../Types/employee_types";
import { useNavigate } from "react-router-dom";
import MainCard from "../../../Utils/CCard/MainCard";
import { useAppSelector } from "../../../Store/Store";
import { decryptData } from "../../../constant/encrytion";
import { useEmployeeUpdateMutation } from "../../../Store/feature/UserManagement/Employee_Slice/Employee_Api_Slice";
import { cToastify } from "../../../Shared";
import { errorAlert } from "../../../Utils/alert-function";

const EditEmployee = () => {
  const { selectSingleEmployee } = useAppSelector(
    (state) => state.employeeSlice
  ) as any;
  console.log("selectSingleEmployee", selectSingleEmployee);
  console.log("role", selectSingleEmployee?.role);
  const initialState = {
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    role: "",
    fatherName: "",
    whatsapp: "",
    NID: "",
    education: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    mobileBanking: "",
    mobileBankingNumber: "",
    address: "",
    zipCode: "",
    profile_picture: null,
    NIDImage: null,
  };
  const [editData, setEditData] = useState<employeeDataType>(initialState);

  const navigate = useNavigate();

  const vendorId = decryptData("userData")?.user?.vendorId;

  useEffect(() => {
    setEditData({
    fullName: selectSingleEmployee?.fullName || "",
    username: selectSingleEmployee?.user?.username || "",
    email: selectSingleEmployee?.user?.email || "",
    mobile: selectSingleEmployee?.user?.mobile || "",
    role: selectSingleEmployee?.role || "",
    fatherName: selectSingleEmployee?.fatherName || "",
    whatsapp: selectSingleEmployee?.whatsapp || "",
    NID: selectSingleEmployee?.NID || "",
    education: selectSingleEmployee?.education || "",
    bankName: selectSingleEmployee?.bankName || "",
    branchName: selectSingleEmployee?.branchName || "",
    accountNumber: selectSingleEmployee?.accountNumber || "",
    mobileBanking: selectSingleEmployee?.mobileBanking || "",
    mobileBankingNumber: selectSingleEmployee?.mobileBankingNumber || "",
    address: selectSingleEmployee?.address || "",
    zipCode: selectSingleEmployee?.zipCode || "",
    profile_picture: selectSingleEmployee?.profile_picture || null,
    NIDImage: selectSingleEmployee?.NIDImage || null,
    })
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target as HTMLInputElement;
    setEditData({ ...editData, [name]: value });
  };

  const handleImageChange = (e: any, name: any) => {
    const file = e.target.files[0];
    setEditData((prev) => ({ ...prev, [name]: file }));
  };

    // handle update employee
    const [
      employeeUpdate,
      { isLoading, isSuccess, isError, error: updateError },
    ] = useEmployeeUpdateMutation();

    useEffect(() => {
      if (isSuccess) {
        cToastify({
          type: "success",
          message: "Employee Updated Successfully",
        });
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isError) {
        errorAlert({
          text: updateError?.data?.message || "Something went wrong",
        });
      }
    }, [isError, updateError?.data?.message]);

    const handleUpdateSubmit = async (e: any) => {
      e.preventDefault();
      const body = {
        fullName: editData?.fullName || "",
        username: editData?.username || "",
        email: editData?.email || "",
        mobile: editData?.mobile || "",
        role: editData?.role || "",
        fatherName: editData?.fatherName || "",
        whatsapp: editData?.whatsapp || "",
        NID: editData?.NID || "",
        education: editData?.education || "",
        bankName: editData?.bankName || "",
        branchName: editData?.branchName || "",
        accountNumber: editData?.accountNumber || "",
        mobileBanking: editData?.mobileBanking || "",
        mobileBankingNumber: editData?.mobileBankingNumber || "",
        address: editData?.address || "",
        zipCode: editData?.zipCode || "",
        } as any;

      const formData = new FormData();
      // formData.append("fullName", editData.fullName);
      // formData.append("username", editData.username);
      // formData.append("email", editData.email);
      // formData.append("password", selectSingleEmployee?.user?.password);
      // formData.append("mobile", editData.mobile);
      // formData.append("role", editData.role);
      // formData.append("fatherName", editData.fatherName);
      // formData.append("whatsapp", editData.whatsapp);
      // formData.append("NID", editData.NID);
      // formData.append("education", editData.education);
      // formData.append("bankName", editData.bankName);
      // formData.append("branchName", editData.branchName);
      // formData.append("accountNumber", editData.accountNumber);
      // formData.append("mobileBanking", editData.mobileBanking);
      // formData.append("mobileBankingNumber", editData.mobileBankingNumber);
      // formData.append("address", editData.address);
      // formData.append("zipCode", editData.zipCode);
      // formData.append("profile_picture", editData.profile_picture);
      // formData.append("NIDImage", editData.NIDImage);
      // formData.append("vendorId", vendorId);
      if (editData.profile_picture instanceof File) {
        formData.append("image", editData.profile_picture);
      }

      
      if (editData.NIDImage instanceof File) {
        formData.append("image", editData.NIDImage);
      }

      for (const key in body) {
        if (body[key]) {
          formData.append(key, body[key]);
        }
      }

      // for (const key in editData) {
      //   const typedKey = key as keyof employeeDataType;
      //   if (editData[typedKey]) {
      //     formData.append(key, editData[typedKey]);
      //   }
      // }

      try {
        const employeeId = selectSingleEmployee?.id;
        await employeeUpdate({
          employeeId,
          body: formData,
        });
        navigate("/vendor/employees");
      } catch (error) {
        console.log("error", error);
        navigate("/vendor/employees");
      }

      setEditData(initialState);
    };

    return (
      <MainCard title="Edit Employee">
        <form
          onSubmit={handleUpdateSubmit}
          // autoComplete={"off"}
          // autoCorrect="off"
        >
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
            <div className="p-1">
              <Cinput
                id="fullName"
                label="Full Name"
                name="fullName"
                value={editData?.fullName}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="username"
                label="Username"
                name="username"
                value={editData?.username}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="email"
                label="Email"
                name="email"
                type="email"
                value={editData?.email}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="mobile"
                label="Mobile"
                name="mobile"
                value={editData?.mobile}
                key={selectSingleEmployee?.id}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <CSelect
                label="Role (Non-editable)"
                name="role"
                value={editData?.role}
                onChange={(e) => setEditData({ ...editData, role: e.value })}
                disabled
                options={[
                  { value: "OPERATOR", label: "Operator" },
                  { value: "REPRESENTATIVE", label: "Representative" },
                  { value: "RAIDER", label: "Rider" },
                ]}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="fatherName"
                label="Father Name"
                name="fatherName"
                value={editData.fatherName}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="whatsapp"
                label="WhatsApp No"
                name="whatsapp"
                value={editData.whatsapp}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="NID"
                label="NID"
                name="NID"
                value={editData.NID}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="education"
                label="Education"
                name="education"
                value={editData.education}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="bankName"
                label="Bank Name"
                name="bankName"
                value={editData.bankName || ""}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="branchName"
                label="Branch Name"
                name="branchName"
                value={editData.branchName || ""}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="accountNumber"
                label="Account No"
                name="accountNumber"
                value={editData.accountNumber || ""}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="mobileBanking"
                label="Mobile Banking"
                name="mobileBanking"
                value={editData.mobileBanking || ""}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="mobileBankingNumber"
                label="Mobile Banking No"
                name="mobileBankingNumber"
                value={editData.mobileBankingNumber || ""}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="address"
                label="Address"
                name="address"
                value={editData.address}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <Cinput
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                value={editData.zipCode}
                onChange={handleEditChange}
              />
            </div>
            <div className="p-1">
              <CFileInput
                type="file"
                id="profile_picture"
                files={editData.profile_picture}
                value={editData.profile_picture}
                placeholder="Upload Profile Image"
                label="Profile Image"
                name="profile_picture"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleImageChange(e, "profile_picture")}
              />
            </div>
            <div className="p-1">
              <CFileInput
                type="file"
                id="NIDImage"
                files={editData.NIDImage}
                value={editData.NIDImage}
                placeholder="Upload NID Image"
                label="NID Image"
                name="NIDImage"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => handleImageChange(e, "NIDImage")}
              />
            </div>
          </div>

          <div className="my-4 p-1 flex justify-end">
            <CButton variant="outline" type="submit">
              Update
            </CButton>
          </div>
        </form>
      </MainCard>
    );
  };

export default EditEmployee;
