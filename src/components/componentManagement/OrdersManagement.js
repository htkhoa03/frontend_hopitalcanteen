import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SideBar from "../SideBar";

const OrderManagement = ({ orders, onAcceptOrder, onDeleteOrder }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleAcceptOrder = (order) => {
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handleDeleteOrder = (order) => {
    setCurrentOrder(order);
    setDialogOpen(true);
  };

  const handleConfirmAction = (action) => {
    if (action === "accept") {
      onAcceptOrder(currentOrder.id); // Chấp nhận đơn hàng
    } else if (action === "delete") {
      onDeleteOrder(currentOrder.id); // Xóa đơn hàng
    }
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <SideBar></SideBar>
      <Typography variant="h5" gutterBottom align="center">
        Quản lý đơn hàng
      </Typography>
      <List>
        {orders && Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <ListItem
              key={order.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #e0e0e0",
                padding: "16px 0",
              }}
            >
              <ListItemText
                primary={`Mã đơn hàng: ${order.id}`}
                secondary={`Khách hàng: ${
                  order.customerName
                } | Tổng tiền: ${order.totalPrice.toLocaleString()} VND`}
                sx={{ marginBottom: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleAcceptOrder(order)}
                >
                  Chấp nhận
                </Button>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteOrder(order)}
                  sx={{ marginLeft: 2 }}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" align="center" color="textSecondary">
            Không có đơn hàng nào.
          </Typography>
        )}
      </List>

      {/* Dialog xác nhận hành động */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận hành động</DialogTitle>
        <DialogContent>
          <Alert severity="info">
            Bạn có chắc chắn muốn {currentOrder ? currentOrder.action : ""} đơn
            hàng này?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={() => handleConfirmAction("accept")} color="success">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderManagement;
