import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Tài khoản của bạn
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        sx={{ marginTop: 2 }}
      >
        Đăng xuất
      </Button>
    </Box>
  );
};

export default User;
