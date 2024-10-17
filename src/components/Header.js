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
import "./componentStyles/Header.css";

const Header = ({ user }) => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setValue(0);
        break;
      case "/user":
        setValue(1);
        break;
      case "/login":
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
    if (user) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar
        className="header-toolbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            <Tab component={Link} to="/menu" label="Home" />
            <Tab
              label={user ? user.username : "Tài khoản"}
              onClick={handleAccountClick}
            />
          </Tabs>
          {user && (
            <Button
              component={Link}
              to="/user"
              color="inherit"
              className="header-account-btn"
            >
              {user.username}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
