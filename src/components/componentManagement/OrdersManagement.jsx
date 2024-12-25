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
} from "@mui/material";
import { Print, Check, Delete } from "@mui/icons-material";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table as DocTable,
  TableRow as DocTableRow,
  TableCell as DocTableCell,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch data giả lập
  useEffect(() => {
    const mockOrders = [
      {
        id: "DH001",
        total: 500000,
        status: "confirmed",
        orderTime: "2024-12-15 10:30",
        products: [
          { name: "Sản phẩm A", quantity: 2, price: 100000 },
          { name: "Sản phẩm B", quantity: 1, price: 300000 },
        ],
      },
      {
        id: "DH002",
        total: 200000,
        status: "pending",
        orderTime: "2024-12-16 14:00",
        products: [{ name: "Sản phẩm C", quantity: 1, price: 200000 }],
      },
      {
        id: "DH003",
        total: 150000,
        status: "cancelled",
        orderTime: "2024-12-17 09:15",
        products: [{ name: "Sản phẩm D", quantity: 3, price: 50000 }],
      },
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Lọc đơn hàng theo trạng thái
  useEffect(() => {
    if (orderStatus === "all") {
      setFilteredOrders(orders.filter((order) => order.status === "pending"));
    } else {
      setFilteredOrders(orders.filter((order) => order.status === orderStatus));
    }
  }, [orderStatus, orders]);

  // Xử lý xác nhận đơn hàng
  const handleConfirmOrder = (order) => {
    setOrders((prevOrders) =>
      prevOrders.map((item) =>
        item.id === order.id ? { ...item, status: "confirmed" } : item
      )
    );
    setSelectedOrder(order);
    setOrderProducts(order.products);
    setOpenDialog(true);
  };

  // In hóa đơn ra file PDF
  const handlePrintBill = async () => {
    if (!selectedOrder) return;

    // Tạo nội dung cho hóa đơn
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                width: 80 * 20, // 80mm
                height: 297 * 20, // A4 chiều cao
              },
            },
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Hóa đơn: ${selectedOrder.id}`,
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(`Thời gian đặt hàng: ${selectedOrder.orderTime}`),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(
                  `Tổng tiền: ${selectedOrder.total.toLocaleString()} Đ`
                ),
              ],
            }),
            new DocTable({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new DocTableRow({
                  children: [
                    new DocTableCell({
                      children: [new Paragraph("Sản phẩm")],
                    }),
                    new DocTableCell({
                      children: [new Paragraph("Số lượng")],
                    }),
                    new DocTableCell({
                      children: [new Paragraph("Giá")],
                    }),
                  ],
                }),
                ...selectedOrder.products.map(
                  (product) =>
                    new DocTableRow({
                      children: [
                        new DocTableCell({
                          children: [new Paragraph(product.name)],
                        }),
                        new DocTableCell({
                          children: [
                            new Paragraph(product.quantity.toString()),
                          ],
                        }),
                        new DocTableCell({
                          children: [
                            new Paragraph(
                              product.price.toLocaleString() + " Đ"
                            ),
                          ],
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        },
      ],
    });

    // Lưu file
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Hoa_don_${selectedOrder.id}.docx`);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#1976d2",
          fontWeight: "bold",
          mb: 4,
          mt: 6,
        }}
      >
        Quản lý đơn hàng
      </Typography>

      {/* Nút chuyển trạng thái */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Button
          variant={orderStatus === "all" ? "contained" : "outlined"}
          onClick={() => setOrderStatus("all")}
          sx={{ textTransform: "none" }}
        >
          Tất cả đơn hàng
        </Button>
        <Button
          variant={orderStatus === "confirmed" ? "contained" : "outlined"}
          onClick={() => setOrderStatus("confirmed")}
          sx={{ textTransform: "none" }}
        >
          Đơn hàng đã xác nhận
        </Button>
        <Button
          variant={orderStatus === "cancelled" ? "contained" : "outlined"}
          onClick={() => setOrderStatus("cancelled")}
          sx={{ textTransform: "none" }}
        >
          Đơn hàng đã hủy
        </Button>
      </Box>

      {/* Bảng danh sách đơn hàng */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell align="center">Mã đơn hàng</TableCell>
              <TableCell align="center">Tổng giá</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.id}</TableCell>
                <TableCell align="center">
                  {order.total.toLocaleString()} Đ
                </TableCell>
                <TableCell align="center">
                  <Button
                    startIcon={<Check />}
                    sx={{ mr: 1 }}
                    onClick={() => handleConfirmOrder(order)}
                    disabled={order.status !== "pending"}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => console.log(`Xóa: ${order.id}`)}
                  >
                    Hủy bỏ
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog hiển thị sản phẩm */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Chi tiết đơn hàng: {selectedOrder?.id}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Thời gian đặt hàng: {selectedOrder?.orderTime}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Tổng tiền: {selectedOrder?.total?.toLocaleString()} Đ
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price.toLocaleString()} Đ</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<Print />}
            variant="contained"
            onClick={handlePrintBill}
          >
            In hóa đơn
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersManagement;
