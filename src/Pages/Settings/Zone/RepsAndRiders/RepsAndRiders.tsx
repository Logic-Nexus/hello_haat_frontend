// make a  dynnamic component to show the list of representatives and riders
import { FC } from "react";
import { FaWhatsapp } from "react-icons/fa";

const RepsAndRiders: FC<{
  selectedDatas: any;
  formType: string;
}> = ({ selectedDatas, formType }) => {
  return (
    <>
      <h3 className="text-sm font-semibold mb-2">{formType}</h3>
      <hr className="border-t border-gray-200 mb-2" />
      <ul
        className="space-y-2 max-h-60 overflow-y-auto
        "
      >
        {selectedDatas?.map((data: any) => (
          <li key={data?.id} className="space-x-2 shadow p-1 rounded">
            <span className="font-semibold text-sm">{data?.fullName}</span>
            <small className="text-gray-500">({data?.employeeID})</small>
            <small className="text-gray-500 flex items-center space-x-1 ">
              <FaWhatsapp className="text-green-500" />
              <span>{data?.whatsapp}</span>
            </small>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RepsAndRiders;
