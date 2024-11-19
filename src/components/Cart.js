import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Cart = ({
  cartItems,
  onCheckout,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onUpdateQuantity,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false); // Trạng thái Dialog

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value, 10) || 1); // Đảm bảo số lượng ít nhất là 1
    onUpdateQuantity(id, quantity);
  };

  const handleCheckoutClick = () => {
    onCheckout(); // Gọi hàm thanh toán
    setDialogOpen(true); // Mở hộp thoại
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Đóng hộp thoại
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Giỏ hàng
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 50,
                height: 50,
                marginRight: 16,
                borderRadius: 8,
              }}
            />
            <ListItemText
              primary={item.name}
              secondary={`Giá: ${item.price * item.quantity} VND`}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => onDecreaseQuantity(item.id)}>
                <RemoveIcon />
              </IconButton>
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                inputProps={{ min: 1, style: { textAlign: "center" } }}
                style={{ width: 60, margin: "0 8px" }}
              />
              <IconButton onClick={() => onIncreaseQuantity(item.id)}>
                <AddIcon />
              </IconButton>
            </div>
            <IconButton onClick={() => onRemoveFromCart(item.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Tổng tiền: {totalPrice} VND
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleCheckoutClick}
        fullWidth
      >
        Thanh toán
      </Button>

      {/* Payment notification */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <TaskAltIcon sx={{ fontSize: "70px", color: "green" }} />
          </Box>
          <Typography>
            Thanh toán thành công! Cảm ơn bạn đã mua hàng.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
