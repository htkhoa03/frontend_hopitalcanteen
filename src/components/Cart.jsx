import React, { useState } from "react";
import {
  clearCartAPI,
  getCartAPI,
  removeFromCartAPI,
} from "../axios/cartService";
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
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItems,
  setTotalAmount,
  removeCartItems,
  clearCart,
} from "../redux/cartSlice";

const Cart = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isErrorDialogOpen, setErrorDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartId = useSelector((state) => state.cart?.cartId);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  console.log(cartItems);

  // Lấy dữ liệu giỏ hàng
  const fetchCartData = async () => {
    try {
      const res = await getCartAPI(cartId);
      const data = res;
      console.log("ress",res)

      if (data) {
        dispatch(setCartItems(data.items || []));
        dispatch(setTotalAmount(data.totalAmount || 0));
      } else {
        console.error("Cart data is invalid.");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Xử lý xóa sản phẩm
  const handleRemoveFromCartItems = async (itemId) => {
    try {
      console.log("Removing item with ID:", itemId);
      await removeFromCartAPI(cartId, itemId);
      dispatch(removeCartItems(itemId));
      await fetchCartData();
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Không thể xóa sản phẩm.");
    }
  };
  // xóa toàn bộ sản phẩm
  const handleClearAllCart = async () => {
    try {
      await clearCartAPI(cartId);
      dispatch(clearCart(cartId));
      // dispatch(setTotalAmount(totalAmount === 0));
      await fetchCartData();
    } catch (error) {
      console.log("Error clear cart: ", error);
    }
  };

  // Xử lý thanh toán
  const handleCheckoutClick = async () => {
    // if (patientBalance >= totalAmount) {
    //   setPatientBalance((prevBalance) => prevBalance - totalAmount);
    //   try {
    //     await clearCartAPI(cartId);
    //     dispatch(setCartItems([])); // Xóa sạch giỏ hàng
    //     dispatch(setTotalAmount(0)); // Reset tổng tiền
    //     setDialogOpen(true);
    //   } catch (error) {
    //     console.error("Error during checkout:", error);
    //   }
    // } else {
    //   setErrorDialogOpen(true);
    // }
  };

  // Gọi API lấy dữ liệu giỏ hàng khi component render
  // useEffect(() => {
  //   fetchCartData();
  // }, [fetchCartData]);

  // Đóng Dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setErrorDialogOpen(false);
  };

  return (
    <Box
    sx={{
      width: "93%",
      maxWidth: "400px",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      position: "relative",
      margin: "10px auto", // Center on smaller screens
    }}
  >
    <Typography
      variant="h5"
      sx={{
        fontWeight: "bold",
        textAlign: "center",
        mb: 2,
        color: "#1976d2",
      }}
    >
      Giỏ hàng của bạn
    </Typography>

    <Divider sx={{ mb: 2 }} />

    <List>
      {(cartItems || []).map((item) => (
        <ListItem
          key={item?.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            padding: "10px 15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              {item?.product?.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", mt: 0.5 }}
            >
              Giá: {item?.unitPrice?.toLocaleString()} VND
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", mt: 0.5 }}
            >
              Số lượng: {item?.quantity}
            </Typography>
          </Box>
          <Button
            onClick={() => handleRemoveFromCartItems(item.id)}
            variant="contained"
            color="error"
            sx={{
              minWidth: "80px",
              fontSize: "0.875rem",
              fontWeight: "bold",
            }}
          >
            Xóa
          </Button>
        </ListItem>
      ))}
    </List>

    <Divider sx={{ my: 2 }} />

    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        textAlign: "right",
        mb: 2,
        color: "#1976d2",
      }}
    >
      Tổng tiền:{" "}
      <span style={{ color: "#e53935" }}>
        {totalAmount.toLocaleString()} VND
      </span>
    </Typography>

    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClearAllCart}
        sx={{
          flex: 1,
          fontWeight: "bold",
          borderColor: "#e53935",
          color: "#e53935",
          "&:hover": {
            backgroundColor: "#ffe5e5",
          },
        }}
      >
        Xóa toàn bộ
      </Button>
      <Button
        variant="contained"
        onClick={handleCheckoutClick}
        sx={{
          flex: 1,
          fontWeight: "bold",
          backgroundColor: "#43a047",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
        }}
      >
        Mua
      </Button>
    </Box>

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
