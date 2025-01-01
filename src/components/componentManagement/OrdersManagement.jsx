import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import { cancelOrders, confirmOrders, getAllOrdersByStatus } from "../../axios/orderService";

const OrdersManagement = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("PENDING");
  
  const orderStatuses = [
    { label: "Đơn hàng chờ", value: "PENDING" },
    { label: "Đơn hàng đã xác nhận", value: "CONFIRMED" },
    { label: "Đơn hàng đã hủy", value: "CANCELED" },
  ];

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch orders by status
  const handleOrderByStatus = async (status) => {
    try {
      setOrderStatus(status); 
      const response = await getAllOrdersByStatus(status);
      setFilteredOrders(response); 
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Không thể tải đơn hàng theo trạng thái!",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    handleOrderByStatus(orderStatus);
  }, []);

  // Confirm order
  const handleConfirmOrder = async (orderId) => {
    try {
      await confirmOrders(orderId);
      setSnackbar({ open: true, message: "Xác nhận đơn hàng thành công!", severity: "success" });
      handleOrderByStatus(orderStatus); 
    } catch {
      setSnackbar({ open: true, message: "Xác nhận đơn hàng thất bại!", severity: "error" });
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrders(orderId);
      setSnackbar({ open: true, message: "Hủy đơn hàng thành công!", severity: "success" });
      handleOrderByStatus(orderStatus); 
    } catch {
      setSnackbar({ open: true, message: "Hủy đơn hàng thất bại!", severity: "error" });
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 3, mt: 5 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "#1976d2", fontWeight: "bold", mb: 4 }}
      >
        Quản lý đơn hàng
      </Typography>

      {/* Bộ lọc trạng thái */}
       {/* Tabs chuyển đổi trạng thái */}
       <Tabs
        value={orderStatus}
        onChange={(e, newValue) => handleOrderByStatus(newValue)}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        {orderStatuses.map((status) => (
          <Tab key={status.value} label={status.label} value={status.value} />
        ))}
      </Tabs>

      {/* Bảng danh sách đơn hàng */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "white" }}>Mã đơn hàng</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Tổng giá</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Trạng thái</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">
                  {order.totalAmount?.toLocaleString()} Đ
                </TableCell>
                <TableCell align="center">{order.orderStatus}</TableCell>
                <TableCell align="center">
                  <Button
                    startIcon={<Check />}
                    onClick={() => handleConfirmOrder(order.id)}
                    disabled={order.orderStatus !== "PENDING"}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Hủy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrdersManagement;
