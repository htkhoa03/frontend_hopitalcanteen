import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/management/management-home",
    },
    {
      text: "Quản lý sản phẩm",
      icon: <InventoryIcon />,
      path: "/management/product-management",
    },
    {
      text: "Quản lý nhân viên",
      icon: <PeopleIcon />,
      path: "/management/staff-management",
    },
    {
      text: "Quản lý tài khoản",
      icon: <AccountCircleIcon />,
      path: "/management/account-management",
    },
    {
      text: "Quản lý đơn hàng",
      icon: <ReceiptIcon />,
      path: "/management/orders-management",
    },
  ];

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 300 },
        height: "100vh",
        backgroundColor: "#1d4ed8",
        color: "white",
        padding: "20px 0",
        position: { xs: "relative", md: "fixed" },
        zIndex: 10,

        marginTop: "30px",
        left: 0,
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            button
            onClick={() => navigate(item.path)}
            sx={{
              padding: "16px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
