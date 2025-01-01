import axios from "./axios";

// API để tạo đơn hàng
export const createOrderAPI = async (patientId) => {
  const response = await axios.post(`/orders/order?patientId=${patientId}`);
  return response.data.data;
};
// get all orders
export const getAllOrders = async () => {
  const response = await axios.get("/orders/all");
  return response.data.data.content;
};
// get order by status
export const getAllOrdersByStatus = async (orderStatus, page =0, size= 10, sortBy="orderDate", sortDirection = "asc") => {
  const response = await axios.get(`/orders/all?status=${orderStatus}`,{
    params: { page, size, sortBy, sortDirection }
  });
  return response.data.data.content;
};


// xác nhận đơn hàng
export const confirmOrders = async (orderId) => {
  const response = await axios.put(`/orders/${orderId}/confirm`);
  return response.data.data;
};

// hủy đơn hàng

export const cancelOrders = async (orderId) => {
  const response = await axios.put(`/orders/${orderId}/cancel`);
  return response.data.data;
};
