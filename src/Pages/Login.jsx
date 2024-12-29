import React, { useState } from "react";
import { Typography, TextField, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../axios/loginService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      (username && password && cardNumber) ||
      (!username && !password && !cardNumber)
    ) {
      setError("Vui lòng chỉ nhập Tên đăng nhập & Mật khẩu hoặc Mã bệnh nhân.");
      return;
    }

    try {
      let res;
      let role;
      if (cardNumber) {
        res = await handleLogin({ cardNumber });
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        role = "PATIENT";
        localStorage.setItem("role", role);
        navigate("/home", { replace: true });
        console.log(accessToken);
      } else {
        res = await handleLogin({ username, password });
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        role = "USER";
        localStorage.setItem("role", role);
        navigate("/management/management-home", { replace: true });
      }
      console.log(`AccessToken: ${localStorage.getItem("accessToken")}, Role: ${role}`);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }
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
              src="../../logobv.png"
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
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
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
              backgroundColor: "#33b2e7",

              "&:hover": {
                backgroundColor: "#3CA4D6",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              },
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
