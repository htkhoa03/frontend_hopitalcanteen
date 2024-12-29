import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import "./componentStyles/Header.css";
import { getDataPatients } from "../axios/patientService";
import { getDataUsers } from "../axios/userService";

const Header = () => {
  const [displayName, setDisplayName] = useState(null);
  const [loginType, setLoginType] = useState(null); // Đăng nhập qua user hay patient
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // const patientInfo = useSelector(selectPatient);
  // const { cardNumber, patientId } = patientInfo;

  const tabValue =
    location.pathname === "/home"
      ? 0
      : location.pathname.includes("management/management-home")
      ? 0
      : false;

  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const role = localStorage.getItem("role"); 
        if (role === "PATIENT") {
          const patientRes = await getDataPatients();
          const { fullName } = patientRes.data.data;
          setDisplayName(`BN-${fullName}`);
        } else if (role === "USER") {
          const userRes = await getDataUsers();
          const { username } = userRes.data.data;
          setDisplayName(username);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Xử lý nhấn nút tài khoản
  const handleAccountClick = () => {
    console.log(loginType);
    if (role === "PATIENT") {
      navigate("/patient");
    } else if (role === "USER") {
      navigate("/user");
    }
  };

  // Xử lý nhấn nút đăng nhập
  const handleLoginClick = () => {
    navigate("/");
  };
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);
  }, []);

  return (
    <AppBar position="fixed" className="header-appbar">
      <Toolbar
        className="header-toolbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#345DA7",
          color: "white",
        }}
      >
        {/* Logo và tiêu đề */}
        <Box display="flex" alignItems="center">
          <img src="../../logobv.png" alt="Logo" className="header-logo" />
          <Typography
            variant="h6"
            sx={{
              marginLeft: "8px",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.25rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Căn tin Bệnh viện
          </Typography>
        </Box>

        {/* Tabs và nút */}
        <Box display="flex" alignItems="center">
          <Tabs
            value={tabValue}
            textColor="inherit"
            indicatorColor="secondary"
            className="header-tabs"
          >
            {role === "PATIENT" ? (
              <Tab component={Link} to="/home" label="Trang chủ" />
            ) : role === "USER" ? (
              <Tab
                component={Link}
                to="/management/management-home"
                label="Quản lý"
              />
            ) : null}
          </Tabs>
          {loading ? (
            <CircularProgress size={24} style={{ marginLeft: "16px" }} />
          ) : displayName ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" style={{ marginRight: "8px" }}>
                {role === "PATIENT" ? "Xin chào, Bệnh nhân" : "Xin chào,"}
              </Typography>
              <Button
                color="inherit"
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
