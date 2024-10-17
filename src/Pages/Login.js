import React, { useState } from "react";
import { Typography, TextField, Button, Link } from "@mui/material";
import "./Styles/LoginStyles.css";
import checkLogin from "../utils/data";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (customerCode) {
      const user = checkLogin(null, null, customerCode);
      if (user) {
        navigate("/", { replace: true });
      } else {
        setError("CustomerCode không chính xác");
      }
      return;
    }
    if (!username || !password) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu");
      return;
    }

    const user = checkLogin(username, password, null);
    if (user) {
      navigate("/management-home", { replace: true });
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác");
    }
  };

  const handleForgotPassword = () => {
    console.log("Quên mật khẩu");
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <img src="../../logo.png" alt="Logo" className="logo" />
      <Typography variant="h4" className="title">
        Đăng nhập
      </Typography>
      <Typography variant="body1" className="label">
        Tên đăng nhập
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="input-field"
      />
      <Typography variant="body1" className="label">
        Mật khẩu
      </Typography>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="input-field"
      />
      <Link
        href="/forgot-password"
        onClick={handleForgotPassword}
        className="forgot-password"
      >
        Quên mật khẩu
      </Link>
      <Typography variant="body1" className="label">
        Nếu bạn là bệnh nhân thì nhập mã bệnh nhân
      </Typography>
      <TextField
        label="Customer Code"
        value={customerCode}
        onChange={(event) => setCustomerCode(event.target.value)}
        className="input-field"
      />
      {error && (
        <Typography
          variant="body2"
          sx={{ color: "red" }}
          className="error-message"
        >
          {error}
        </Typography>
      )}
      <br />
      <Button type="submit" variant="contained" className="submit-button">
        Đăng nhập
      </Button>
    </form>
  );
};

export default Login;
