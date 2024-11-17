import React from "react";
import { Box, Container } from "@mui/material";
import Header from "../components/Header";

const ManagementHome = () => {
  return (
    <Container>
      <Header />
      <Box className="management-right"></Box>
    </Container>
  );
};

export default ManagementHome;
