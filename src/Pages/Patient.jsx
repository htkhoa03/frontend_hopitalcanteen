import React from "react";
import  Info  from "../components/Info";

const PatientPage = () => {
  const fields = [
    { label: "Tên", key: "fullName" },
    { label: "Mã bệnh nhân", key: "cardNumber" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Email", key: "email" },
    { label: "Số phòng", key: "room" },
    { label: "Số khoa", key: "departments.departmentName" },
    { label: "Số tiền", key: "patientBalance.balance" },
  ];

  return <Info apiEndpoint="/patients/my-info" fields={fields} />;
};

export default PatientPage;
