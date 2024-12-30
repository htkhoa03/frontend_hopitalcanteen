import axios from "axios";
import { isTokenExpired, handleLogout } from '../utils/jwtUtils';

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    // Kiểm tra token tồn tại và còn hạn
    if (token) {
      if (isTokenExpired(token)) {
        handleLogout();
        return Promise.reject('Token expired');
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Xử lý response
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data.message === "Xác thực không thành công: Token không hợp lệ hoặc đã hết hạn") {
      handleLogout();
    }
    return Promise.reject(error);
  }
);
export default instance;
