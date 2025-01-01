// src/utils/jwt.utils.js

const decodeJWT = (token) => {
  try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken;
  } catch (error) {
      return null;
  }
};

// Hàm kiểm tra token hết hạn
const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded) {
      return true;
  }
  
  // So sánh thời gian hiện tại với thời gian hết hạn của token
  return decoded.exp * 1000 < Date.now();
};

// Hàm xử lý logout
const handleLogout = () => {
  // Xóa token khỏi localStorage
  localStorage.removeItem('accessToken');
  // Chuyển về trang chủ
  window.location.href = '/';
};

// Hàm kiểm tra token
const checkTokenExpiration = () => {
  const token = localStorage.getItem('accessToken'); // Sửa lại key cho đồng nhất
  
  if (!token) {
      handleLogout();
      return;
  }

  if (isTokenExpired(token)) {
      handleLogout();
  }
};

export {
  decodeJWT,
  isTokenExpired,
  handleLogout,
  checkTokenExpiration
};