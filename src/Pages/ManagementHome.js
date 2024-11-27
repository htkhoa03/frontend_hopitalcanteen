import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductManagement from "../components/componentManagement/ProductManagement";
import EmployeeManagement from "../components/componentManagement/EmployeesManagement";
import AccountManagement from "../components/componentManagement/PatientManagement";
import OrdersManagement from "../components/componentManagement/OrdersManagement";
import {
  Box,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { salesData } from "../utils/data";

const ManagementHome = () => {
  const [timeFrame, setTimeFrame] = useState("today");
  const [productsSold, setProductsSold] = useState(
    salesData.today.productsSold
  );
  const [ordersPlaced, setOrdersPlaced] = useState(
    salesData.today.ordersPlaced
  );
  const [totalRevenue, setTotalRevenue] = useState(
    salesData.today.totalRevenue
  );

  const handleTimeFrameChange = (event) => {
    const selectedTimeFrame = event.target.value;
    setTimeFrame(selectedTimeFrame);
    setProductsSold(salesData[selectedTimeFrame].productsSold);
    setOrdersPlaced(salesData[selectedTimeFrame].ordersPlaced);
    setTotalRevenue(salesData[selectedTimeFrame].totalRevenue);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
          maxWidth: "700px",
          marginTop: "100px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: { xs: 2, sm: 0 } }}>
          Dashboard
        </Typography>
        <FormControl sx={{ width: { xs: "100%", sm: 200 } }}>
          <Select value={timeFrame} onChange={handleTimeFrameChange}>
            <MenuItem value="today">Hôm nay</MenuItem>
            <MenuItem value="month">Tháng này</MenuItem>
            <MenuItem value="year">Năm nay</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: "#f1f8ff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#dbeafe",
                  padding: "16px",
                  borderRadius: "50%",
                  marginRight: { sm: "16px" },
                  marginBottom: { xs: 2, sm: 0 },
                }}
              >
                <Typography
                  component="div"
                  sx={{ fontSize: "2rem", color: "#1d4ed8" }}
                >
                  📦
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography variant="h6" sx={{ color: "#1d4ed8" }}>
                  Tổng sản phẩm bán được
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#1d4ed8" }}
                >
                  {productsSold}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: "#fff7e6",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#fef3c7",
                  padding: "16px",
                  borderRadius: "50%",
                  marginRight: { sm: "16px" },
                  marginBottom: { xs: 2, sm: 0 },
                }}
              >
                <Typography
                  component="div"
                  sx={{ fontSize: "2rem", color: "#f59e0b" }}
                >
                  🛒
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography variant="h6" sx={{ color: "#d97706" }}>
                  Tổng đơn hàng
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#d97706" }}
                >
                  {ordersPlaced}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              backgroundColor: "#d1fae5",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#a7f3d0",
                  padding: "16px",
                  borderRadius: "50%",
                  marginRight: { sm: "16px" },
                  marginBottom: { xs: 2, sm: 0 },
                }}
              >
                <Typography
                  component="div"
                  sx={{ fontSize: "2rem", color: "#10b981" }}
                >
                  💰
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography variant="h6" sx={{ color: "#16a34a" }}>
                  Tổng tiền bán được
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#16a34a" }}
                >
                  {totalRevenue.toLocaleString()} VNĐ
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Routes */}
      <Box>
        <Routes>
          <Route
            path="/management/product-management"
            element={<ProductManagement />}
          />
          <Route
            path="/management/employees-management"
            element={<EmployeeManagement />}
          />
          <Route
            path="/management/account-management"
            element={<AccountManagement />}
          />
          <Route
            path="/management/orders-management"
            element={<OrdersManagement />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default ManagementHome;
