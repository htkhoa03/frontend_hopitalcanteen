import React from "react";
import {
  Typography,
  Button,
  Card,
  Avatar,
  Box,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../redux/userSlice";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import BedIcon from "@mui/icons-material/Bed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleGoToManagement = () => {
    navigate("/management-home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f7fc",
        padding: 2,
      }}
    >
      {user.login ? (
        <Card
          sx={{
            width: "100%",
            maxWidth: 800,
            display: "flex",
            padding: 4,
            boxShadow: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "30%" },
              borderRight: { xs: "none", sm: "1px solid #e0e0e0" },
              padding: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#4caf50",
                width: 120,
                height: 120,
                fontSize: 50,
                marginBottom: 2,
              }}
            >
              {user.username
                ? user.username.charAt(0).toUpperCase()
                : user.customerCode.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h6" fontWeight="bold" color="#388e3c">
              {user.username
                ? user.username
                : `Mã bệnh nhân: ${user.customerCode}`}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {user.username ? "Tài khoản đăng nhập" : "Hồ sơ bệnh nhân"}
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              padding: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", paddingBottom: "5px" }}
            >
              Thông tin tài khoản
            </Typography>
            <Paper
              elevation={0}
              sx={{
                backgroundColor: "#f9fbe7",
                padding: 2,
                borderRadius: 2,
                border: "1px solid #e0f2f1",
              }}
            >
              <Stack spacing={2}>
                <Typography variant="body1">
                  <strong>
                    <BadgeIcon /> Họ và tên:
                  </strong>{" "}
                  {user.name}
                </Typography>
                {user.role && (
                  <Typography variant="body1">
                    <strong>
                      {" "}
                      <PersonOutlineIcon /> Vai trò:
                    </strong>{" "}
                    {user.role}
                  </Typography>
                )}
                <Typography variant="body1">
                  <strong>
                    {" "}
                    <PhoneIcon /> Số điện thoại:
                  </strong>{" "}
                  {user.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>
                    {" "}
                    <BedIcon /> Số phòng:
                  </strong>{" "}
                  {user.room}
                </Typography>
                <Typography variant="body1">
                  <strong>
                    {" "}
                    <AttachMoneyIcon /> Số tiền:
                  </strong>{" "}
                  {user.balance.toLocaleString()} VND
                </Typography>
              </Stack>
            </Paper>

            <Divider sx={{ marginY: 2 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: { xs: "center", sm: "flex-end" },
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{ minWidth: 150 }}
              >
                Đăng xuất
              </Button>
              {user.username && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleGoToManagement}
                  sx={{ minWidth: 150 }}
                >
                  Trở về Quản lí
                </Button>
              )}
            </Box>
          </Box>
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
