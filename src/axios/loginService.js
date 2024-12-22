import axios from "./axios";

export const handleLogin = (data) => {
  if (data.cardNumber) {
    // Sử dụng query param cho cardNumber
    return axios.post(`/login/patient?cardNumber=${data.cardNumber}`);
  }

  // Sử dụng body cho username/password
  return axios.post("/login/user", {
    username: data.username,
    password: data.password,
  });
};
