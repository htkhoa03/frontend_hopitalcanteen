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
    removeCartItems: (state, action) =>{
      const itemId = action.payload;
      state.items = state.items.filter((item)=>item.id !== itemId) 
    },
    clearCart: (state) => {
      state.cartId = null;
      state.totalAmount = 0;
      state.items = [];
    },
  },
});

export const { setCartId, setTotalAmount, setCartItems,removeCartItems, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
