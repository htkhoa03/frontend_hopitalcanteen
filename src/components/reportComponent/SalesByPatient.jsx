import React from "react";
import SalesTable from "./SalesTable"; // Gọi lại SalesTable

const SalesByPatient = () => {
  return (
    <div>
      <SalesTable tabType="patient" />

    </div>
  );
};

export default SalesByPatient;
