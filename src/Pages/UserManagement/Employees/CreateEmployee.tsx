import { useState } from "react";
import { CButton, CModal, CSelect } from "../../../Utils";
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
  const [createData, setCreateData] = useState<employeeDataType>(initialState);

  const [crateEmployee, { isLoading, isSuccess }] = useCreateEmployeeMutation();

  const navigate = useNavigate();

  const vendorId = decryptData("userData")?.user?.vendorId;

  const handleCreateChange = (e: any) => {
    const { name, value } = e.target;
    setCreateData({ ...createData, [name]: value });
  };

  // function for changing/putting image
  const handleImageChange = (e: any, name: any) => {
    const file = e.target.files[0];
    setCreateData((prev) => ({ ...prev, [name]: file }));
  };

  const handleCreateSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", createData.fullName);
    formData.append("username", createData.username);
    formData.append("email", createData.email);
    formData.append("password", createData.password);
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
        navigate("/employees");
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
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="username"
              value={createData.username}
              label="Username"
              name="username"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="email"
              value={createData.email}
              label="Email"
              name="email"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="password"
              value={createData.password}
              label="Password"
              name="password"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="mobile"
              value={createData.mobile}
              label="Mobile"
              name="mobile"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <CSelect
              label="Role"
              name="role"
              onChange={(e) => setCreateData({ ...createData, role: e.value })}
              value={createData.role}
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
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="whatsapp"
              value={createData.whatsapp}
              label="WhatsApp No"
              name="whatsapp"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="NID"
              label="NID"
              name="NID"
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
            <Cinput
              id="mobileBanking"
              value={createData.mobileBanking}
              label="Mobile Banking"
              name="mobileBanking"
              onChange={handleCreateChange}
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
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <Cinput
              id="zipCode"
              value={createData.zipCode}
              label="Zip Code"
              name="zipCode"
              onChange={handleCreateChange}
            />
          </div>
          <div className="p-1">
            <CFileInput
              id="profile_picture"
              value={createData.profile_picture}
              label="Profile Image"
              name="profile_picture"
              fileName={createData.profile_picture?.name || ""}
              onChange={(e) => handleImageChange(e, "profile_picture")}
            />
          </div>
          <div className="p-1">
            <CFileInput
              id="NIDImage"
              value={createData.NIDImage}
              label="NID Image"
              name="NIDImage"
              fileName={createData.NIDImage?.name || ""}
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
