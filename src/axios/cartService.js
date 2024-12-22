import axios from "axios";

export const addToCartAPI = async (cartId, productId, quantity) => {
  try {
    const response = await axios.post(`/carts/${cartId}/items`, {
      productId,
      quantity,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error adding to cart:", error.response || error);
    throw error;
  }
};

export const getCartAPI = async (cartId) => {
  try {
    const response = await axios.get(`/carts/${cartId}/my-cart`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cart:", error.response || error);
    throw error;
  }
};

export const clearCartAPI = async (cartId) => {
  try {
    const response = await axios.delete(`/carts/${cartId}/clear`);
    return response.data.data;
  } catch (error) {
    console.error("Error clearing cart:", error.response || error);
    throw error;
  }
};
