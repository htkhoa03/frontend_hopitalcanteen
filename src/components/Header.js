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
import axios from "../axios/axios";
import "./componentStyles/Header.css";

const Header = () => {
  const [displayName, setDisplayName] = useState(null);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const tabValue = (() => {
    if (displayName?.startsWith("BN-")) {
      return location.pathname === "/home" ? 0 : false;
    }
    return location.pathname === "/management/management-home" ? 0 : false;
  })();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          // Decode token hoặc gọi API để lấy vai trò người dùng
          const roleResponse = await axios.get("/auth/role", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { role } = roleResponse.data;

          let res;
          if (role === "PATIENT") {
            res = await axios.get("/patients/myinfo", {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else if (role === "USER") {
            res = await axios.get("/myinfo", {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            throw new Error("Role không hợp lệ");
          }

          // Xử lý dữ liệu người dùng
          const { username, cardNumber } = res.data;
          if (username) {
            setDisplayName(username);
          } else if (cardNumber) {
            setDisplayName(`BN-${cardNumber}`);
          }
          setLogin(true);
        }
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        setLogin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAccountClick = () => {
    if (displayName?.startsWith("BN-")) {
      navigate("/patient");
    } else {
      navigate("/user");
    }
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
            value={tabValue}
            textColor="inherit"
            indicatorColor="secondary"
            className="header-tabs"
          >
            {displayName?.startsWith("BN-") ? (
              <Tab
                component={Link}
                to="/home"
                aria-label="home"
                label="Trang chủ"
              />
            ) : (
              <Tab
                component={Link}
                to="/management/management-home"
                aria-label="management"
                label="Quản lý"
              />
            )}
          </Tabs>
          {loading ? (
            <Typography variant="body2" style={{ marginLeft: "16px" }}>
              Đang tải...
            </Typography>
          ) : login ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" style={{ marginRight: "8px" }}>
                {displayName.startsWith("BN-")
                  ? "Xin chào, Bệnh nhân"
                  : "Xin chào,"}
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
