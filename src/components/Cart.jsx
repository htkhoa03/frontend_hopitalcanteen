import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCartAPI, addToCartAPI, clearCartAPI } from "../axios/cartService";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Cart = ({ cartId, patientBalance, setPatientBalance }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartAPI(cartId);
        setCartItems(data.items); // Cập nhật giỏ hàng từ backend
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
    fetchCart();
  }, [cartId]);

  // Xử lý thêm sản phẩm
  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCartAPI(cartId, productId, quantity);
      const updatedCart = await getCartAPI(cartId); // Lấy giỏ hàng cập nhật
      setCartItems(updatedCart.data.items);
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Không thể thêm sản phẩm.");
    }
  };

  // Xử lý xóa sản phẩm
  const handleRemoveFromCart = async (productId) => {
    try {
      // Giả sử API xóa sản phẩm là DELETE `/carts/:cartId/items/:productId`
      await axios.delete(`/carts/${cartId}/items/${productId}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
      alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Không thể xóa sản phẩm.");
    }
  };

  // Xử lý thanh toán
  const handleCheckoutClick = async () => {
    if (patientBalance >= totalPrice) {
      setPatientBalance((prevBalance) => prevBalance - totalPrice);
      try {
        await clearCartAPI(cartId); // Gọi API clear cart
        setCartItems([]); // Xóa sạch cartItems sau khi thanh toán
        setDialogOpen(true);
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    } else {
      setErrorDialogOpen(true);
    }
  };

  // Đóng Dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setErrorDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
      }}
    >
      <Typography variant="h5">Giỏ hàng của bạn</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Giá: ${item.price.toLocaleString()} VND`}
            />
            {/* Các nút chỉnh sửa số lượng */}
            <Button
              onClick={() => handleRemoveFromCart(item.id)}
              variant="outlined"
              color="error"
            >
              Xóa
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleCheckoutClick}>
        Thanh toán
      </Button>

      {/* Dialogs */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Thanh toán thành công!</DialogTitle>
        <DialogContent>Cảm ơn bạn đã mua hàng.</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isErrorDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Lỗi</DialogTitle>
        <DialogContent>Số dư không đủ.</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
