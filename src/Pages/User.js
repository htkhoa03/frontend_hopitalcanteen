import React from "react";
import { Container, Typography, Grid } from "@mui/material";

const User = ({ user }) => {
  return (
    <Container>
      <Typography variant="h4">Thông Tin Tài Khoản</Typography>
      {user ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Tên đăng nhập: {user.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Mã khách hàng: {user.customerCode}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>
          Vui lòng đăng nhập để xem thông tin tài khoản của bạn.
        </Typography>
      )}
    </Container>
  );
};

export default User;
