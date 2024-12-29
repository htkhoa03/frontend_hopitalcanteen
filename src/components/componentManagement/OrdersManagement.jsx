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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Print, Check, Delete } from "@mui/icons-material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { cancelOrders, confirmOrders, getAllOrders } from "../../axios/orderService";


const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response);
      setFilteredOrders(response);
    } catch (error) {
      setSnackbar({ open: true, message: "Không thể tải danh sách đơn hàng!", severity: "error" });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on status
  useEffect(() => {
    if (orderStatus === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === orderStatus));
    }
  }, [orderStatus, orders]);

  // Confirm order
  const handleConfirmOrder = async (orderId) => {
    try {
      const response = await confirmOrders();
      setSnackbar({ open: true, message: response.message, severity: "success" });
      fetchOrders();
    } catch (error) {
      setSnackbar({ open: true, message: "Xác nhận đơn hàng thất bại!", severity: "error" });
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await cancelOrders();
      setSnackbar({ open: true, message: response.message, severity: "success" });
      fetchOrders();
    } catch (error) {
      setSnackbar({ open: true, message: "Hủy đơn hàng thất bại!", severity: "error" });
    }
  };

  // Print bill
  const handlePrintBill = () => {
    if (!selectedOrder) return;
    const doc = new jsPDF();
    doc.text(`Hóa đơn: ${selectedOrder.id}`, 20, 20);
    doc.text(`Thời gian đặt hàng: ${selectedOrder.orderTime}`, 20, 30);
    doc.text(`Tổng tiền: ${selectedOrder.total.toLocaleString()} Đ`, 20, 40);
    doc.autoTable({
      head: [["Sản phẩm", "Số lượng", "Giá"]],
      body: selectedOrder.products.map((product) => [
        product.name,
        product.quantity,
        product.price.toLocaleString() + " Đ",
      ]),
      startY: 50,
    });
    doc.save(`Hoa_don_${selectedOrder.id}.pdf`);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 3, mt:5 }}>
      <Typography variant="h4" sx={{ textAlign: "center", color: "#1976d2", fontWeight: "bold", mb: 4 }}>
        Quản lý đơn hàng
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        {["all", "confirmed", "cancelled"].map((status) => (
          <Button
            key={status}
            variant={orderStatus === status ? "contained" : "outlined"}
            onClick={() => setOrderStatus(status)}
          >
            {status === "all" ? "Tất cả đơn hàng" : `Đơn hàng ${status}`}
          </Button>
        ))}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell align="center">Mã đơn hàng</TableCell>
              <TableCell align="center">Tổng giá</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.orderId}</TableCell>
                <TableCell align="center">{order.total.toLocaleString()} Đ</TableCell>
                <TableCell align="center">{order.status}</TableCell>
                <TableCell align="center">
                  <Button
                    startIcon={<Check />}
                    onClick={() => handleConfirmOrder(order.orderId)}
                    disabled={order.status !== "pending"}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrdersManagement;
