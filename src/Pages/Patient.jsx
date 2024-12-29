import React from "react";
import  Info  from "../components/Info";

const PatientPage = () => {
  const fields = [
    { label: "Tên", key: "fullName" },
    { label: "Mã bệnh nhân", key: "cardNumber" },
    { label: "Số điện thoại", key: "phone" },
    { label: "Số phòng", key: "roomNumber" },
    { label: "Số khoa", key: "departmentNumber" },
    { label: "Số tiền", key: "balance" },
  ];

  return <Info apiEndpoint="/patients/my-info" fields={fields} />;
};

export default PatientPage;
