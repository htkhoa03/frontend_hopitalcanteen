import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import jsPDF from "jspdf";

const OrdersManagement = () => {
  const [showConfirmed, setShowConfirmed] = useState(false); // Mặc định xem đơn hàng chưa xác nhận
  const [showCancelled, setShowCancelled] = useState(false); // Trạng thái xem đơn hàng đã hủy
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false); // Dialog xác nhận hủy

  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      products: [
        { name: "Sản phẩm A", quantity: 2, price: 500000 },
        { name: "Sản phẩm B", quantity: 1, price: 1000000 },
      ],
      confirm: false,
      cancelled: false,
    },
    {
      id: "ORD002",
      products: [
        { name: "Sản phẩm C", quantity: 3, price: 300000 },
        { name: "Sản phẩm D", quantity: 2, price: 800000 },
      ],
      confirm: true,
      cancelled: false,
    },
    {
      id: "ORD003",
      products: [{ name: "Sản phẩm E", quantity: 1, price: 1500000 }],
      confirm: false,
      cancelled: true,
    },
  ]);

  const handleConfirmClick = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCancelOrder = (orderId) => {
    setCancelDialogOpen(true);
    setSelectedOrder(orderId); // Lưu lại ID đơn hàng để xác nhận hủy
  };

  const handleCancelConfirm = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder
          ? { ...order, cancelled: true, confirm: false }
          : order
      )
    );
    setCancelDialogOpen(false);
  };

  const handleCancelClose = () => {
    setCancelDialogOpen(false);
  };

  const handlePrintBill = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "cm",
      format: [8, 30],
    });

    pdf.setFont("aria");

    if (selectedOrder) {
      let y = 1;

      // Header
      pdf.setFontSize(12);
      pdf.text("CĂN TIN BỆNH VIỆN", 1, y);
      y += 0.8;
      pdf.setFontSize(9);
      pdf.text("Địa chỉ: 123 Đường ABC, Quận X, TP.HCM", 1, y);
      y += 0.6;
      pdf.text(`Mã đơn hàng: ${selectedOrder.id}`, 1, y);
      y += 0.6;
      pdf.text(`Thời gian: ${new Date().toLocaleString()}`, 1, y);

      // Table header
      y += 0.8;
      pdf.setFontSize(8);
      pdf.text("Tên sản phẩm", 1, y);
      pdf.text("SL", 5, y);
      pdf.text("Đơn giá", 6, y);

      // Table content
      let total = 0;
      y += 0.6;
      selectedOrder.products.forEach((product) => {
        pdf.text(product.name, 1, y);
        pdf.text(`${product.quantity}`, 5, y, { align: "right" });
        pdf.text(`${product.price.toLocaleString("vi-VN")}`, 6.5, y, {
          align: "right",
        });
        total += product.quantity * product.price;
        y += 0.6;
      });

      // Total
      y += 0.6;
      pdf.text("Tổng cộng:", 1, y);
      pdf.text(`${total.toLocaleString("vi-VN")} Đ`, 6.5, y, {
        align: "right",
      });

      // Footer
      y += 1;
      pdf.setFontSize(9);
      pdf.text("Cảm ơn quý khách đã mua sắm tại Căn tin!", 1, y);
      y += 0.6;
      pdf.text("Hẹn gặp lại!", 1, y);

      // Save PDF
      pdf.save(`bill_${selectedOrder.id}.pdf`);

      // Cập nhật trạng thái đơn hàng thành đã xác nhận và chuyển qua chế độ xem đơn hàng đã xác nhận
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, confirm: true } : order
        )
      );

      // Đóng dialog và chuyển qua chế độ xem đơn hàng đã xác nhận
      setDialogOpen(false);
      setShowConfirmed(true); // Chuyển sang chế độ xem đơn hàng đã xác nhận
    }
  };

  // Lọc đơn hàng theo trạng thái
  const filteredOrders = orders.filter((order) => {
    if (showConfirmed) {
      return order.confirm && !order.cancelled;
    } else if (showCancelled) {
      return order.cancelled;
    } else {
      return !order.confirm && !order.cancelled;
    }
  });

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Quản lý đơn hàng
      </Typography>

      {/* Buttons to toggle between confirmed, unconfirmed, and cancelled orders */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color={!showConfirmed ? "primary" : "default"}
          onClick={() => setShowConfirmed(false)}
        >
          Xem đơn hàng chưa xác nhận
        </Button>
        <Button
          variant="contained"
          color={showConfirmed ? "secondary" : "default"}
          onClick={() => setShowConfirmed(true)}
          sx={{ ml: 2 }}
        >
          Xem đơn hàng đã xác nhận
        </Button>
        <Button
          variant="contained"
          color={showCancelled ? "error" : "default"}
          onClick={() => setShowCancelled(true)}
          sx={{ ml: 2 }}
        >
          Xem đơn hàng đã bị hủy
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID Đơn hàng</TableCell>
              <TableCell align="center">Số lượng sản phẩm</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">{order.products.length}</TableCell>
                <TableCell align="center">
                  {order.cancelled ? (
                    <Typography color="error">Đã hủy</Typography>
                  ) : order.confirm ? (
                    <Typography color="success.main">Đã xác nhận</Typography>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirmClick(order)}
                      >
                        Xác nhận
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleCancelOrder(order.id)}
                        sx={{ ml: 2 }}
                      >
                        Hủy
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog xác nhận hủy */}
      <Dialog open={cancelDialogOpen} onClose={handleCancelClose}>
        <DialogTitle>Hủy đơn hàng</DialogTitle>
        <DialogContent>
          <Typography>Bạn có chắc chắn muốn hủy đơn hàng này không?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleCancelConfirm} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog chi tiết đơn hàng và in bill */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Giá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      {product.price.toLocaleString("vi-VN")} Đ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Đóng
          </Button>
          <Button onClick={handlePrintBill} color="primary">
            In Bill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersManagement;
