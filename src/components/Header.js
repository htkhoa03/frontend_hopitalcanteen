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
import { useSelector } from "react-redux";
import "./componentStyles/Header.css";
import HomeIcon from "@mui/icons-material/Home";

const Header = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const login = useSelector((state) => state.user.login);
  const username = useSelector((state) => state.user.username);
  const customerCode = useSelector((state) => state.user.customerCode);

  const displayName = username || customerCode;

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setValue(0);
        break;
      case "/user":
        setValue(1);
        break;
      case "/management-home":
        setValue(2);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccountClick = () => {
    navigate("/user");
  };

  return (
    <AppBar position="static" className="header-appbar">
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
            Canteen Bệnh viện
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            className="header-tabs"
          >
            <Tab
              component={Link}
              to="/home"
              icon={<HomeIcon />}
              aria-label="home"
            />
          </Tabs>
          {login && (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" style={{ marginRight: "8px" }}>
                Hi,
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
                {displayName ? displayName : "Đăng nhập"}{" "}
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
