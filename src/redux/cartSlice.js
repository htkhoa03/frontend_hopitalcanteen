import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    cartId: null,
  },
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    removeCartItems: (state, action) => {
      const itemId = action.payload;
    
      // Kiểm tra xem itemId có tồn tại không
      if (state.items.some((item) => item.id === itemId)) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        console.warn(`Item with ID ${itemId} not found in cart.`);
      }
    },
    
    clearCart: (state) => {
      // Reset trạng thái giỏ hàng
      state.totalAmount = 0;
      state.items = [];
    },
    
  },
});

export const { setCartId, setTotalAmount, setCartItems,removeCartItems, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
