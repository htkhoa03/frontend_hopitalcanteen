import React from "react";
import { Box, Container } from "@mui/material";
import SideBar from "../components/SideBar";

const ManagementHome = () => {
  return (
    <Container>
      <Box className="management-right">
        <SideBar />
      </Box>
    </Container>
  );
};

export default ManagementHome;
