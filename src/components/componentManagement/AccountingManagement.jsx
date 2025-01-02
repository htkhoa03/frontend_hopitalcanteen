import React from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import OverviewStatistics from "../reportComponent/OverviewStatistics";
import SalesByEmployee from "../reportComponent/SalesByPatient";
import SalesByPatient from "../reportComponent/SalesByPatient";

function AccountingManagement() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ padding: 3, mt: 6 }}>
      <Typography variant="h4" gutterBottom sx={{color:"primary"}}>
        Báo cáo thống kê
      </Typography>

      <Tabs value={tabIndex} onChange={handleChange} aria-label="report tabs" >
        <Tab label="Thống kê" />
        <Tab label="Doanh thu theo nhân viên" />
        <Tab label="Bán hàng theo bệnh nhân" />
      </Tabs>
      {tabIndex === 0 && <OverviewStatistics />}
      {tabIndex === 1 && <SalesByEmployee />}
      {tabIndex === 2 && <SalesByPatient />}

    </Box>
  );
}

export default AccountingManagement;
