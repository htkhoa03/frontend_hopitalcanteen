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
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Check, Delete, Print } from "@mui/icons-material";
import {
  cancelOrders,
  confirmOrders,
  getAllOrdersByStatus,
} from "../../axios/orderService";
import PrintBill from "../PrintBill";

const OrdersManagement = () => {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("PENDING");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmingOrderId, setConfirmingOrderId] = useState(null);

  const orderStatuses = [
    { label: "Đơn hàng chờ", value: "PENDING" },
    { label: "Đơn hàng đã xác nhận", value: "CONFIRMED" },
    { label: "Đơn hàng đã hủy", value: "CANCELED" },
  ];

  const [isPrinted, setIsPrinted] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch orders by status
  const handleOrderByStatus = async (status) => {
    try {
      setOrderStatus(status);
      const response = await getAllOrdersByStatus(status, page, size);
      setFilteredOrders(response);
      setTotalPages(response.totalPages);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Không thể tải đơn hàng theo trạng thái!",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    handleOrderByStatus(orderStatus, page, size);
  }, []);

  const handleConfirmOrder = async (orderId) => {
    setConfirmingOrderId(orderId);
    const order = filteredOrders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleConfirmAfterPrint = async () => {
    try {
      await confirmOrders(confirmingOrderId);
      handleOrderByStatus(orderStatus);

      setSnackbar({
        open: true,
        message: "Xác nhận đơn hàng thành công!",
        severity: "success",
      });
      setOpenDialog(false);
    } catch {
      setSnackbar({
        open: true,
        message: "Xác nhận đơn hàng thất bại!",
        severity: "error",
      });
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrders(orderId);
      setSnackbar({
        open: true,
        message: "Hủy đơn hàng thành công!",
        severity: "success",
      });
      handleOrderByStatus(orderStatus);
    } catch {
      setSnackbar({
        open: true,
        message: "Hủy đơn hàng thất bại!",
        severity: "error",
      });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 3, mt: 5 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#1976d2",
          fontWeight: "bold",
          mb: 4,
        }}
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
              <TableCell align="center" sx={{ color: "white" }}>
                Mã đơn hàng
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Tổng giá
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Trạng thái
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Hành động
              </TableCell>
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
                    disabled={order.orderStatus === "CANCELED"}
                  >
                    Hủy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* in bill */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>In Hóa Đơn</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <PrintBill
              selectedOrder={selectedOrder}
              onPrintComplete={handleConfirmAfterPrint}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, value) => handlePageChange(event, value)}
          color="primary"
        />
      </Box>

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
