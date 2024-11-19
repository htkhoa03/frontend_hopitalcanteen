import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {user.login ? (
        <Card
          sx={{
            width: 400,
            padding: 3,
            boxShadow: 3,
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} textAlign="center">
              <Avatar
                sx={{
                  bgcolor: "#1976d2",
                  width: 80,
                  height: 80,
                  margin: "0 auto",
                  fontSize: 32,
                }}
              >
                {user.username
                  ? user.username.charAt(0).toUpperCase()
                  : user.customerCode.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {user.username
                  ? user.username
                  : `Mã bệnh nhân: ${user.customerCode}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="body1">
                  <strong>Họ và tên:</strong> {user.name}
                </Typography>
                {user.role && (
                  <Typography variant="body1">
                    <strong>Vai trò:</strong> {user.role}
                  </Typography>
                )}
                <Typography variant="body1">
                  <strong>Số điện thoại:</strong> {user.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Số phòng:</strong> {user.room}
                </Typography>
                <Typography variant="body1">
                  <strong>Số tiền:</strong> {user.balance} VND
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12}>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                  sx={{ width: "100%" }}
                >
                  Đăng xuất
                </Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Bạn chưa đăng nhập
        </Typography>
      )}
    </Box>
  );
};

export default User;
