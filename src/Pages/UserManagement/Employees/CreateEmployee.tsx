import { useState } from "react";
import { CButton, CSelect } from "../../../Utils";
import Cinput from "../../../Utils/CInput/Cinput";
import CFileInput from "../../../Utils/CFileInput/CFileInput";
import { employeeDataType } from "../../../Types/employee_types";
import { useCreateEmployeeMutation } from "../../../Store/feature/UserManagement/Employee_Slice/Employee_Api_Slice";
import { useNavigate } from "react-router-dom";
import MainCard from "../../../Utils/CCard/MainCard";
import { decryptData } from "../../../constant/encrytion";

const CreateEmployee = () => {
  const initialState = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    mobile: "",
    role: "OPERATOR",
    fatherName: "",
    whatsapp: "",
    NID: "",
    education: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    mobileBanking: "bKash",
    mobileBankingNumber: "",
    address: "",
    zipCode: "",
    profile_picture: null,
    NIDImage: null,
  };
  const [createData, setCreateData] = useState<employeeDataType>(initialState);

  const [crateEmployee, { isLoading }] = useCreateEmployeeMutation();

  // when submit button is clicked this error is given
  const [error, setError] = useState({
    error_for_full_name: false,
    error_for_username: false,
    error_for_email: false,
    error_for_password: false,
    error_for_mobile: false,
    error_for_father_name: false,
    error_for_whatsapp: false,
    error_for_NID: false,
    error_for_education: false,
    error_for_address: false,
    error_for_zip_code: false,
    error_for_profile_picture: false,
    error_for_NID_image: false,
  });

  const navigate = useNavigate();

  const vendorId = decryptData("userData")?.user?.vendorId;

  const handleCreateChange = (e: any) => {
    const { name, value } = e.target;
    setCreateData({ ...createData, [name]: value });

    // Reset the error if editing employee
    if (name === "fullName") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_full_name: false,
      }));
    }
    if (name === "username") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_username: false,
      }));
    }
    if (name === "email") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_email: false,
      }));
    }
    if (name === "password") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_password: false,
      }));
    }
    if (name === "mobile") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_mobile: false,
      }));
    }
    if (name === "fatherName") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_father_name: false,
      }));
    }
    if (name === "whatsapp") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_whatsapp: false,
      }));
    }
    if (name === "NID") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_NID: false,
      }));
    }
    if (name === "education") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_education: false,
      }));
    }
    if (name === "address") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_address: false,
      }));
    }
    if (name === "zipCode") {
      setError((prevError: any) => ({
        ...prevError,
        error_for_zip_code: false,
      }));
    }
  };

  // function for changing/putting image
  const handleImageChange = (e: any, name: any) => {
    const file = e.target.files[0];
    setCreateData((prev) => ({ ...prev, [name]: file }));
  };

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    if (createData?.fullName === "") {
      setError((prev) => ({ ...prev, error_for_full_name: true }));
      return;
    }
    if (createData?.username === "") {
      setError((prev) => ({ ...prev, error_for_username: true }));
      return;
    }
    if (createData?.email === "") {
      setError((prev) => ({ ...prev, error_for_email: true }));
      return;
    }
    if (createData?.password === "") {
      setError((prev) => ({ ...prev, error_for_password: true }));
      return;
    }
    if (createData?.mobile === "") {
      setError((prev) => ({ ...prev, error_for_mobile: true }));
      return;
    }
    if (createData?.fatherName === "") {
      setError((prev) => ({ ...prev, error_for_father_name: true }));
      return;
    }
    if (createData?.whatsapp === "") {
      setError((prev) => ({ ...prev, error_for_whatsapp: true }));
      return;
    }
    if (createData?.NID === "") {
      setError((prev) => ({ ...prev, error_for_NID: true }));
      return;
    }
    if (createData?.education === "") {
      setError((prev) => ({ ...prev, error_for_education: true }));
      return;
    }
    if (createData?.address === "") {
      setError((prev) => ({ ...prev, error_for_address: true }));
      return;
    }
    if (createData?.zipCode === "") {
      setError((prev) => ({ ...prev, error_for_zip_code: true }));
      return;
    }

    const formData = new FormData();
    formData.append("fullName", createData.fullName);
    formData.append("username", createData.username);
    formData.append("email", createData.email);
    formData.append("password", createData.password || "");
    formData.append("mobile", createData.mobile);
    formData.append("role", createData.role);
    formData.append("fatherName", createData.fatherName);
    formData.append("whatsapp", createData.whatsapp);
    formData.append("NID", createData.NID);
    formData.append("education", createData.education);
    formData.append("bankName", createData.bankName);
    formData.append("branchName", createData.branchName);
    formData.append("accountNumber", createData.accountNumber);
    formData.append("mobileBanking", createData.mobileBanking);
    formData.append("mobileBankingNumber", createData.mobileBankingNumber);
    formData.append("address", createData.address);
    formData.append("zipCode", createData.zipCode);
    formData.append("profile_picture", createData.profile_picture);
    formData.append("NIDImage", createData.NIDImage);
    formData.append("vendorId", vendorId);

    try {
      const result = await crateEmployee(formData).unwrap();

      if (result?.status === 201) {
        navigate("/vendor/employees");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <MainCard title="Create Employee">
      <form
        onSubmit={handleCreateSubmit}
        // autoComplete={"off"}
        // autoCorrect="off"
      >
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
          <div className="p-1">
            <Cinput
              id="fullName"
              value={createData.fullName}
              label="Full Name"
              name="fullName"
              tooltip={error?.error_for_full_name}
              tooltipPosition="right"
              tooltipContent="Employee full name is required"
              errorQuery={error?.error_for_full_name}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="username"
              value={createData.username}
              label="Username"
              name="username"
              tooltip={error?.error_for_username}
              tooltipPosition="right"
              tooltipContent="Employee username is required"
              errorQuery={error?.error_for_username}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="email"
              value={createData.email}
              label="Email"
              name="email"
              tooltip={error?.error_for_email}
              tooltipPosition="right"
              tooltipContent="Employee email is required"
              errorQuery={error?.error_for_email}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="password"
              value={createData.password}
              label="Password"
              name="password"
              tooltip={error?.error_for_password}
              tooltipPosition="right"
              tooltipContent="Employee password is required"
              errorQuery={error?.error_for_password}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="mobile"
              value={createData.mobile}
              label="Mobile"
              name="mobile"
              tooltip={error?.error_for_mobile}
              tooltipPosition="right"
              tooltipContent="Employee mobile is required"
              errorQuery={error?.error_for_mobile}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <CSelect
              label="Role"
              name="role"
              onChange={(e) => setCreateData({ ...createData, role: e.value })}
              value={createData.role}
              defaultValue={createData.role}
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
              value={createData.fatherName}
              label="Father Name"
              name="fatherName"
              tooltip={error?.error_for_father_name}
              tooltipPosition="right"
              tooltipContent="Employee father name is required"
              errorQuery={error?.error_for_father_name}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="whatsapp"
              value={createData.whatsapp}
              label="WhatsApp No"
              name="whatsapp"
              tooltip={error?.error_for_whatsapp}
              tooltipPosition="right"
              tooltipContent="Employee whatsapp is required"
              errorQuery={error?.error_for_whatsapp}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="NID"
              label="NID"
              name="NID"
              tooltip={error?.error_for_NID}
              tooltipPosition="right"
              tooltipContent="Employee NID No. is required"
              errorQuery={error?.error_for_NID}
              tooltipVariant="error"
              value={createData.NID}
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="education"
              value={createData.education}
              label="Education"
              name="education"
              tooltip={error?.error_for_education}
              tooltipPosition="right"
              tooltipContent="Employee education is required"
              errorQuery={error?.error_for_education}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="bankName"
              value={createData.bankName}
              label="Bank Name"
              name="bankName"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="branchName"
              value={createData.branchName}
              label="Branch Name"
              name="branchName"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="accountNumber"
              value={createData.accountNumber}
              label="Account No"
              name="accountNumber"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <CSelect
              id="mobileBanking"
              label="Mobile Banking"
              name="mobileBanking"
              onChange={(e) =>
                setCreateData({ ...createData, mobileBanking: e.value })
              }
              value={createData.mobileBanking}
              defaultValue={createData.mobileBanking}
              options={[
                { value: "bKash", label: "bKash" },
                { value: "Nagad", label: "Nagad" },
                { value: "Rocket", label: "Rocket" },
                { value: "Upay", label: "Upay" },
              ]}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="mobileBankingNumber"
              value={createData.mobileBankingNumber}
              label="Mobile Banking No"
              name="mobileBankingNumber"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="address"
              value={createData.address}
              label="Address"
              name="address"
              tooltip={error?.error_for_address}
              tooltipPosition="right"
              tooltipContent="Employee address is required"
              errorQuery={error?.error_for_address}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="zipCode"
              value={createData.zipCode}
              label="Zip Code"
              name="zipCode"
              tooltip={error?.error_for_zip_code}
              tooltipPosition="right"
              tooltipContent="Employee zip code is required"
              errorQuery={error?.error_for_zip_code}
              tooltipVariant="error"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <CFileInput
              type="file"
              id="profile_picture"
              files={createData.profile_picture}
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
              files={createData.NIDImage}
              placeholder="Upload NID Image"
              label="NID Image"
              name="NIDImage"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => handleImageChange(e, "NIDImage")}
            />
          </div>
        </div>

        <div className="my-4 p-1 flex justify-end">
          <CButton loading={isLoading} variant="outline" type="submit">
            Create
          </CButton>
        </div>
      </form>
    </MainCard>
  );
};

export default CreateEmployee;
