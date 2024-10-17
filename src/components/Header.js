import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/menu":
        setValue(1);
        break;
      case "/product-management":
        setValue(2);
        break;
      case "/staff-management":
        setValue(3);
        break;
      case "/report":
        setValue(4);
        break;
      default:
        setValue(0); // Mặc định tab "Home"
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" className="header-appbar">
      <Toolbar className="header-toolbar">
        <img src="../../hopital.png" alt="Logo" className="header-logo" />
        <Typography variant="h6" className="header-typography">
          Hopital Canteen
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          className="header-tabs"
        >
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Menu" component={Link} to="/menu" />
          <Tab
            label="Product management"
            component={Link}
            to="/product-management"
          />
          <Tab
            label="Staff management"
            component={Link}
            to="/staff-management"
          />
          <Tab label="Report" component={Link} to="/report" />
        </Tabs>
        <Button
          component={Link}
          to="/account"
          color="inherit"
          className="header-account-btn"
        >
          Account
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
