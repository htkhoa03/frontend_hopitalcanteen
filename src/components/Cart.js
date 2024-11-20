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
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Tính tổng tiền của giỏ hàng
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value, 10) || 1);
    onUpdateQuantity(id, quantity);
  };

  const handleCheckoutClick = () => {
    onCheckout();
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom align="center">
        Giỏ hàng của bạn
      </Typography>
      <List sx={{ padding: "0" }}>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
              padding: "12px 0",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: 60,
                height: 60,
                marginRight: 16,
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <ListItemText
              primary={item.name}
              secondary={`Giá: ${item.price.toLocaleString()} VND`}
              sx={{
                flex: 1,
                marginBottom: 0,
                paddingRight: "10px",
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="primary"
                onClick={() => onDecreaseQuantity(item.id)}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                inputProps={{ min: 1, style: { textAlign: "center" } }}
                sx={{ width: 60, margin: "0 8px", backgroundColor: "#f5f5f5" }}
              />
              <IconButton
                color="primary"
                onClick={() => onIncreaseQuantity(item.id)}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <IconButton
              color="error"
              onClick={() => onRemoveFromCart(item.id)}
              sx={{ marginLeft: "10px" }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 0",
          borderTop: "2px solid #e0e0e0",
          marginTop: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Tổng cộng: {totalPrice.toLocaleString()} VND
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckoutClick}
          sx={{
            padding: "10px 20px",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#0288d1",
            },
          }}
        >
          Thanh toán
        </Button>
      </Box>

      {/* Thanh toán thành công thông báo */}
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
          <Typography variant="h6" align="center">
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
