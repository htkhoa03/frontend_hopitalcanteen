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
  Alert,
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
  patientBalance,
  setPatientBalance,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);

  // Tính tổng tiền
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Xử lý cập nhật số lượng
  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value, 10) || 1);
    onUpdateQuantity(id, quantity);
  };

  // Xử lý thanh toán
  const handleCheckoutClick = () => {
    if (patientBalance >= totalPrice) {
      handleSuccessfulPayment();
    } else {
      setErrorDialogOpen(true);
    }
  };

  const handleSuccessfulPayment = () => {
    setPatientBalance((prevBalance) => prevBalance - totalPrice);
    onCheckout();
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setErrorDialogOpen(false);
  };

  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Giỏ hàng của bạn
      </Typography>

      {/* Danh sách sản phẩm */}
      <List sx={{ width: "100%", maxWidth: "600px", padding: "16px 0" }}>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              borderBottom: "1px solid #e0e0e0",
              padding: "12px 0",
            }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: 60,
                height: 60,
                marginRight: 2,
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
                paddingRight: 1,
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
                inputProps={{
                  min: 1,
                  style: {
                    textAlign: "center",
                    appearance: "none",
                  },
                }}
                sx={{
                  width: 50,
                  backgroundColor: "#f5f5f5",
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "6px 6px",
                  },
                }}
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
              sx={{ marginLeft: 1 }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Tổng cộng và thanh toán */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 0",
          borderTop: "2px solid #e0e0e0",
          marginTop: "16px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Tổng cộng: {totalPrice.toLocaleString()} đ
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckoutClick}
          sx={{
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

      {/* Hộp thoại thanh toán thành công */}
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

      {/* Hộp thoại cảnh báo số dư không đủ */}
      <Dialog open={isErrorDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Cảnh báo</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            Số dư không đủ để thanh toán. Vui lòng kiểm tra lại giỏ hàng.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
