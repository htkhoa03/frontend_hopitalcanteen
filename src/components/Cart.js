import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Cart = ({
  cartItems,
  onCheckout,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
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
              primary={`${item.name}`}
              secondary={`Giá: ${item.price * item.quantity} VND`}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => onDecreaseQuantity(item.id)}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => onIncreaseQuantity(item.id)}>
                  <AddIcon />
                </IconButton>
              </div>
              <IconButton onClick={() => onRemoveFromCart(item.id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </div>
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
