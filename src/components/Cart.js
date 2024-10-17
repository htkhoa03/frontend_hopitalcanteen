import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

const Cart = ({ cartItems, onCheckout }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Giỏ hàng
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} - Số lượng: ${item.quantity}`}
              secondary={`Giá: ${item.price * item.quantity} VND`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Tổng tiền: {totalPrice} VND
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={onCheckout}
        fullWidth
      >
        Thanh toán
      </Button>
    </div>
  );
};

export default Cart;
