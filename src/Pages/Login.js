import React, { useState } from "react";
import { Typography, TextField, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithUsername, loginWithCustomerCode } from "../redux/userSlice";
import checkLogin from "../utils/checkLogin";
import { dataUser } from "../utils/data";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username && password && customerCode) {
      setError(
        "Vui lòng chỉ nhập Tên đăng nhập và Mật khẩu hoặc Mã bệnh nhân."
      );
      return;
    }

    if (customerCode) {
      const user = checkLogin("", "", customerCode);
      if (user) {
        dispatch(
          loginWithCustomerCode({
            customerCode,
            customerData: dataUser,
          })
        );
        navigate("/home", { replace: true });
      } else {
        setError("Mã bệnh nhân không chính xác.");
      }
      return;
    }

    if (username && password) {
      const user = checkLogin(username, password, "");
      if (user) {
        dispatch(
          loginWithUsername({
            username,
            role: user.role,
            phone: user.phone,
            room: user.room,
            balance: user.balance,
            name: user.name,
          })
        );
        navigate("/management/management-home", { replace: true });
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác.");
      }
      return;
    }

    setError("Vui lòng nhập thông tin đăng nhập hợp lệ.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: { xs: "100%", sm: "400px" },
          borderRadius: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <img
              src="../../logo.png"
              alt="Logo"
              style={{
                width: "120px",
                marginBottom: "16px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Đăng nhập
            </Typography>
          </Box>

          <TextField
            label="Tên đăng nhập"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Mật khẩu"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            Nếu bạn là bệnh nhân, vui lòng nhập mã bệnh nhân:
          </Typography>

          <TextField
            label="Mã bệnh nhân"
            variant="outlined"
            fullWidth
            value={customerCode}
            onChange={(event) => setCustomerCode(event.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: "12px",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
