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
        navigate("/menu", { replace: true });
      } else {
        setError("CustomerCode incorrect");
      }
      return;
    }
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const user = checkLogin(username, password, null);
    if (user) {
      navigate("/home", { replace: true });
    } else {
      setError("Username or password incorrect");
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password");
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <img src="../../hopital.png" alt="Logo" className="logo" />
      <Typography variant="h4" className="title">
        Log in
      </Typography>
      <Typography variant="body1" className="label">
        Username
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        className="input-field"
      />
      <Typography variant="body1" className="label">
        Password
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
        Forgot password?
      </Link>
      <Typography variant="body1" className="label">
        If you are patient, please entering customer code
      </Typography>
      <TextField
        label="Customer code"
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
      <br></br>
      <Button type="submit" variant="contained" className="submit-button">
        Submit
      </Button>
    </form>
  );
};

export default Login;
