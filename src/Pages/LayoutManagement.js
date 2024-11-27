import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import SideBar from "../components/SideBar";

const LayoutManagement = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { md: "300px" }, // Reserve space for the sidebarSS
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutManagement;
