import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import "./Styles/LoginStyles.css";
import checkLogin from "../utils/checkLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithUsername, loginWithCustomerCode } from "../redux/userSlice";
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
        "Vui lòng chỉ nhập Tên đăng nhập và Mật khẩu hoặc Mã bệnh nhân, không được nhập cả ba."
      );
      return;
    }

    if (customerCode) {
      // Handle with customerCode
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
        setError("Customer Code không chính xác");
      }
      return;
    }

    if (username && password) {
      // Handle with username and password
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

        navigate("/management-home", { replace: true });
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác");
      }
      return;
    }

    setError("Vui lòng nhập thông tin đăng nhập hợp lệ");
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
        sx={{ marginBottom: "10px" }}
      />
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
