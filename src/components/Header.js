import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  Box,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../axios/axios"; // Kết nối đến backend API
import "./componentStyles/Header.css";

const Header = () => {
  const [value, setValue] = useState(0);
  const [displayName, setDisplayName] = useState(null);
  const [login, setLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const res = await axios.get("/login", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { username, cardNumber } = res.data;
          setDisplayName(username || cardNumber);
          setLogin(true);
        }
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        setLogin(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setValue(0);
        break;
      case "/user":
        setValue(1);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  const handleAccountClick = () => {
    navigate("/user");
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="fixed" className="header-appbar">
      <Toolbar
        className="header-toolbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#345DA7",
        }}
      >
        <Box display="flex" alignItems="center">
          <img src="../../logo.png" alt="Logo" className="header-logo" />
          <Typography
            variant="h6"
            className="header-typography"
            style={{ marginLeft: "8px" }}
          >
            Căn tin Bệnh Viện
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            textColor="inherit"
            indicatorColor="secondary"
            className="header-tabs"
          >
            <Tab
              component={Link}
              to="/home"
              aria-label="home"
              label="Trang chủ"
            />
          </Tabs>
          {login ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" style={{ marginRight: "8px" }}>
                Xin chào,
              </Typography>
              <Button
                color="inherit"
                className="header-account-btn"
                variant="contained"
                onClick={handleAccountClick}
                sx={{
                  backgroundColor: "white",
                  height: "30px",
                  color: "gray",
                }}
              >
                {displayName}
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              className="header-login-btn"
              variant="contained"
              onClick={handleLoginClick}
              sx={{
                backgroundColor: "white",
                height: "30px",
                color: "gray",
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
