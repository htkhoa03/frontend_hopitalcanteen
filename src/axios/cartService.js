import axios from "./axios";

// lấy sản phẩm
export const getCartAPI = async (cartId) => {
  const response = await axios.get(`/carts/${cartId}/my-cart`);
  return response.data.data;
};

// Thêm sản phẩm vào giỏ hàng
export const addToCartAPI = (productId, quantity) => {
  const url = `/cartItems/item/add?quantity=${quantity}&productId=${productId}`;
  return axios.post(url);
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCartAPI = async (cartId, itemId) => {
  await axios.delete(`/cartItems/cart/${cartId}/item/${itemId}`);
};

// Xóa toàn bộ giỏ hàng
export const clearCartAPI = async (cartId) => {
  await axios.delete(`/carts/${cartId}/clear`);
};

// Lấy tổng giá giỏ hàng
export const getTotalPriceAPI = async (cartId) => {
  const response = await axios.get(`/carts/${cartId}/cart/total-price`);
  return response.data.data;
};
// cập nhật sản phẩm 

export const updateCartAPI = async (cartId, itemId, quantity) => {
  const response = await axios.put(`/cartItems/cart/${cartId}/item/${itemId}/update?quantity=${quantity}`);
  return response.data.data;
};