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
import { selectPatient } from "../redux/patientSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const [displayName, setDisplayName] = useState(null);
  const [loginType, setLoginType] = useState(null); // Đăng nhập qua user hay patient
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();


  const patientInfo = useSelector(selectPatient);
  const { cardNumber, patientId } = patientInfo;


  const tabValue = location.pathname === "/home" ? 0 : location.pathname.includes("management/management-home") ? 0 : false;

  // Fetch thông tin người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
       if(cardNumber){
          const patientRes = await axios.get("/patients/my-info");
          const { fullName } = patientRes.data.data;
          setDisplayName(`BN-${fullName}`);
          setLoginType("PATIENT");
       }else{

          // Kiểm tra User thông qua API
          const userRes = await axios.get("/users/my-info");
          const { username } = userRes.data.data;
          setDisplayName(username);
          setLoginType("USER");
       }
        
      } catch (error) {
        console.error("Không thể lấy thông tin người dùng:", error);
        localStorage.removeItem("accessToken"); 
        setDisplayName(null);
        setLoginType(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cardNumber]);

  // Xử lý nhấn nút tài khoản
  const handleAccountClick = () => {
    if (loginType === "PATIENT") {
      navigate("/patient");
    } else if (loginType === "USER") {
      navigate("/user");
    }
  };

  // Xử lý nhấn nút đăng nhập
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
        {/* Logo và tiêu đề */}
        <Box display="flex" alignItems="center">
          <img src="../../hopitallogo.png" alt="Logo" className="header-logo" />
          <Typography
            variant="h6"
            className="header-typography"
            style={{ marginLeft: "8px" }}
          >
            Căn tin Bệnh Viện
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
            {loginType === "PATIENT" ? (
              <Tab component={Link} to="/home" label="Trang chủ" />
            ) : loginType === "USER" ? (
              <Tab component={Link} to="/management/management-home" label="Quản lý" />
            ) : null}
          </Tabs>
          {loading ? (
            <CircularProgress size={24} style={{ marginLeft: "16px" }} />
          ) : displayName ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" style={{ marginRight: "8px" }}>
                {loginType === "PATIENT" ? "Xin chào, Bệnh nhân" : "Xin chào,"}
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
