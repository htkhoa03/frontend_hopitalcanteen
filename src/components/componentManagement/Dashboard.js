import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SideBar from "../SideBar";
import { salesData } from "../../utils/data";

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState("today");
  const [productsSold, setProductsSold] = useState(
    salesData.today.productsSold
  );
  const [ordersPlaced, setOrdersPlaced] = useState(
    salesData.today.ordersPlaced
  );

  const handleTimeFrameChange = (event) => {
    const selectedTimeFrame = event.target.value;
    setTimeFrame(selectedTimeFrame);
    setProductsSold(salesData[selectedTimeFrame].productsSold);
    setOrdersPlaced(salesData[selectedTimeFrame].ordersPlaced);
  };

  return (
    <Container>
      <SideBar />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "300px",
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <FormControl sx={{ width: 200 }}>
          <Select value={timeFrame} onChange={handleTimeFrameChange}>
            <MenuItem value="today">Hôm nay</MenuItem>
            <MenuItem value="month">Tháng này</MenuItem>
            <MenuItem value="year">Năm nay</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4} sx={{ marginTop: 4, marginLeft: "100px" }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "#f1f8ff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#dbeafe",
                  padding: "16px",
                  borderRadius: "50%",
                  marginRight: "16px",
                }}
              >
                <Typography
                  component="div"
                  sx={{ fontSize: "2rem", color: "#1d4ed8" }}
                >
                  📦
                </Typography>
              </Box>
              <Box>
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

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "#fff7e6",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  backgroundColor: "#fef3c7",
                  padding: "16px",
                  borderRadius: "50%",
                  marginRight: "16px",
                }}
              >
                <Typography
                  component="div"
                  sx={{ fontSize: "2rem", color: "#f59e0b" }}
                >
                  🛒
                </Typography>
              </Box>
              <Box>
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
      </Grid>
    </Container>
  );
};

export default Dashboard;
