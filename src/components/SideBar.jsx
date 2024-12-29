import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CategoryIcon from "@mui/icons-material/Category";
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
      text: "Quản lý nhân viên",
      icon: <PeopleIcon />,
      path: "/management/employees-management",
    },
    {
      text: "Quản lý bệnh nhân",
      icon: <AccountCircleIcon />,
      path: "/management/patient-management",
    },
    {
      text: "Quản lý đơn hàng",
      icon: <ReceiptIcon />,
      path: "/management/orders-management",
    },
    {
      text: "Quản lý sản phẩm",
      icon: <InventoryIcon />,
      path: "/management/product-management",
    },
    {
      text: "Quản lý danh mục",
      icon: <CategoryIcon />,
      path: "/management/category-management",
    },
    {
      text: "Kế toán",
      icon: <AccountBalanceIcon />,
      path: "/management/accounting-management",
    },
  ];

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 300 },
        height: "100vh",
        backgroundColor: "whitesmoke",
        color: "black",
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
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#64b5e3",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#345DA7",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
