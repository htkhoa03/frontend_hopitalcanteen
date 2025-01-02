import React from "react";
import SalesTable from "./SalesTable"; // Gọi lại SalesTable

const SalesByEmployee = () => {
  return (
    <div>
      <SalesTable tabType="employee" />

    </div>
  );
};

export default SalesByEmployee;
