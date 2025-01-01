import React, { useEffect, useState } from "react";
import {
  clearCartAPI,
  getCartAPI,
  removeFromCartAPI,
  updateCartAPI,
} from "../axios/cartService";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItems,
  setTotalAmount,
  removeCartItems,
  clearCart,
  setCartId,
} from "../redux/cartSlice";
import { createOrderAPI } from "../axios/orderService";

import useDebounce from "../hooks/useDeBounce";
import { setPatients } from "../redux/patientSlice";
const Cart = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartId = useSelector((state) => state.cart?.cartId);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const patientOrder = useSelector(
    (state) => state.patient?.patient?.patientId
  );

  

  const [quantityChanges, setQuantityChanges] = useState({});
  const debouncedQuantityChanges = useDebounce(quantityChanges, 50);

  const fetchCartData = async () => {
    try {
      const res = await getCartAPI(cartId);
      if (res) {
        dispatch(setCartItems(res.items || []));
        dispatch(setTotalAmount(res.totalAmount));
      } else {
        console.error("Cart data is invalid.");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleRemoveFromCartItems = async (itemId) => {
    try {
      await removeFromCartAPI(cartId, itemId);
      dispatch(removeCartItems(itemId));
      await fetchCartData();
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Không thể xóa sản phẩm.");
    }
  };

  const handleClearAllCart = async () => {
    try {
      await clearCartAPI(cartId);
      dispatch(clearCart(cartId));

      await fetchCartData();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleCheckoutClick = async () => {
    try {
      const res = await createOrderAPI(patientOrder);
      setDialogOpen(true);
      dispatch(setPatients(res.patientOrder));
      console.log("patientId", patientOrder);
    } catch (error) {
      console.error("Error during checkout:", error);
      setErrorDialogOpen(true);
    }
  };

  useEffect(() => {
    const updateQuantities = async () => {
      for (const itemId in debouncedQuantityChanges) {
        const newQuantity = debouncedQuantityChanges[itemId];
        if (newQuantity !== null) {
          await handleUpdateQuantity(itemId, newQuantity);
        }
      }
    };

    updateQuantities();
  }, [debouncedQuantityChanges]);

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantityChanges((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      await updateCartAPI(cartId, itemId, newQuantity);
      await fetchCartData();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Không thể cập nhật số lượng.");
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setErrorDialogOpen(false);
  };

  return (
    <Box
      sx={{
        // position: "fixed",
        right: "20px",
        top: "20px",
        maxWidth: "400px",
        height: "80vh",
        overflowY: "auto",
        padding: "20px",
        borderRadius: "12px",

        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
          color: "#1976d2",
        }}
      >
        Giỏ hàng của bạn
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <List>
        {cartItems.map((item) => (
          <ListItem
            key={item?.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              padding: "10px 15px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                height: "50px",
                width: "50px",
                backgroundImage: `url(http://localhost:8080${
                  item.product.images.length > 0
                    ? item.product.images[0].downloadUrl
                    : "/images/default-placeholder.png"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "8px",
                mr: 2,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {item?.product?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#757575" }}>
                Giá: {item?.unitPrice?.toLocaleString()} VND
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Typography variant="body2" sx={{ color: "#757575" }}>
                  Số lượng:
                </Typography>
                <TextField
                  type="number"
                  value={quantityChanges[item.id] ?? item?.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                  size="small"
                  sx={{ ml: 2, width: "70px" }}
                />
              </Box>
            </Box>
            <IconButton
              onClick={() => handleRemoveFromCartItems(item.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h5"
        sx={{ textAlign: "right", color: "#1976d2", mb: 3 }}
      >
        Tổng tiền: {totalAmount.toLocaleString()} VND
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearAllCart}
          startIcon={<ClearAllIcon />}
          sx={{ flex: 1, fontWeight: "bold" }}
        >
          Xóa toàn bộ
        </Button>
        <Button
          variant="contained"
          onClick={handleCheckoutClick}
          startIcon={<ShoppingCartCheckoutIcon />}
          sx={{ flex: 1, fontWeight: "bold", backgroundColor: "#43a047" }}
        >
          Mua
        </Button>
      </Box>

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
