import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/system";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import axios from "../axios/axios"; // Import axios instance

const StyledCard = styled(Card)(({ theme, bgcolor }) => ({
  height: "100%",
  backgroundColor: bgcolor,
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

const IconWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2.5rem",
  marginBottom: "1rem",
});

const DashboardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

const ManagementDashboard = () => {
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const fetchStatistics = async () => {
    try {
      const res = await axios.get("/statistics/dashboard");
      const { totalProductsSold, totalOrders, totalRevenue } = res.data.data;
      setStatistics({ totalProductsSold, totalOrders, totalRevenue });
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
      <DashboardHeader>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{ color: "#1565c0" }}
            >
              Management Dashboard
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <DatePicker
                label="Ngày bắt đầu"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <DatePicker
                label="Ngày kết thúc"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DashboardHeader>

      <Grid container spacing={4}>
        {/* Card 1: Total Products */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard bgcolor="#e3f2fd">
            <CardContent>
              <IconWrapper>
                <InventoryIcon fontSize="large" sx={{ color: "#1565c0" }} />
              </IconWrapper>
              <Typography
                variant="h4"
                component="div"
                align="center"
                fontWeight="bold"
                gutterBottom
              >
                {statistics?.totalProductsSold}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                Total Products
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Card 2: Total Orders */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard bgcolor="#f3e5f5">
            <CardContent>
              <IconWrapper>
                <ShoppingCartIcon fontSize="large" sx={{ color: "#8e24aa" }} />
              </IconWrapper>
              <Typography
                variant="h4"
                component="div"
                align="center"
                fontWeight="bold"
                gutterBottom
              >
                {statistics.totalOrders}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                Total Orders
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Card 3: Total Revenue */}
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard bgcolor="#e8f5e9">
            <CardContent>
              <IconWrapper>
                <AttachMoneyIcon fontSize="large" sx={{ color: "#43a047" }} />
              </IconWrapper>
              <Typography
                variant="h4"
                component="div"
                align="center"
                fontWeight="bold"
                gutterBottom
              >
                {statistics.totalRevenue.toLocaleString()} Đ
              </Typography>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                Total Revenue
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManagementDashboard;
