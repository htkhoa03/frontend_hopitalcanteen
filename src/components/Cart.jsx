import React, { useState, } from "react";
import {
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartItems,
  setTotalAmount,
  removeCartItems,
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
      console.log("dataaaaaaa", data);

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
        position: "fixed",
        top: "10%",
        right: "5%",
        width: "300px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5">Giỏ hàng của bạn</Typography>
      <List>
        {(cartItems || []).map((item) => (
          <ListItem key={item?.id}>
            <ListItemText
              primary={item?.product?.name}
              secondary={`Giá: ${item?.unitPrice?.toLocaleString()} VND - Số lượng: ${
                item?.quantity
              }`}
            />
            <Button
              onClick={() => handleRemoveFromCartItems(item.id)}
              variant="outlined"
              color="error"
            >
              Xóa
            </Button>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ marginTop: "20px" }}>
        Tổng tiền: {totalAmount.toLocaleString()} VND
      </Typography>

      <Button
        variant="contained"
        onClick={handleCheckoutClick}
        // disabled={cartItems.length === 0 || patientBalance < totalAmount}
        sx={{ marginTop: "10px" }}
      >
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
