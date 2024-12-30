import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { getDashboard } from "../axios/dashboardService";

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
  const [timeframe, setTimeframe] = useState("daily");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDateRange = (timeframe) => {
    const now = new Date();
    let start = new Date();
    let end = new Date();
  
    switch (timeframe) {
      case "daily":
        // Cùng một ngày cho cả start và end
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
  
      case "weekly":
        // Tuần này: từ thứ 2 đến chủ nhật
        const currentDay = start.getDay(); // 0 = Chủ nhật, 1 = Thứ 2,...
        const monday = currentDay === 0 ? -6 : 1 - currentDay; // Tính số ngày đến thứ 2
        start = new Date(now.setDate(now.getDate() + monday));
        end = new Date(start);
        end.setDate(start.getDate() + 6); // Chủ nhật
        break;
  
      case "monthly":
        // Tháng này: từ ngày 1 đến ngày cuối của tháng
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
  
      case "yearly":
        // Năm này: từ 1/1 đến 31/12
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
  
      default:
        break;
    }
  
    // Format dates to YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    return {
      startDate: formatDate(start),
      endDate: formatDate(end)
    };
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dateRange = getDateRange(timeframe);
      const data = await getDashboard(dateRange);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeframe]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

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
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="timeframe-select-label">Thời gian</InputLabel>
              <Select
                labelId="timeframe-select-label"
                value={timeframe}
                label="Timeframe"
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <MenuItem value="daily">Hôm nay</MenuItem>
                <MenuItem value="weekly">Tuần này</MenuItem>
                <MenuItem value="monthly">Tháng này</MenuItem>
                <MenuItem value="yearly">Năm nay</MenuItem>
              </Select>
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
                {dashboardData?.totalProductsSold || 0}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                Tổng sản phẩm đã bán
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
                {dashboardData?.totalOrders || 0}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                Tổng đơn hàng
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
                {dashboardData ? formatCurrency(dashboardData.totalRevenue) : formatCurrency(0)}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                align="center"
                gutterBottom
              >
                Tổng doanh thu
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ManagementDashboard;